"use client"

import type React from "react"
import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo, type FC, type ReactNode } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils.js"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

// ── Beams 3D background ───────────────────────────────────────────────────────

type UniformValue = THREE.IUniform<unknown> | unknown
interface ExtendMaterialConfig {
  header: string; vertexHeader?: string; fragmentHeader?: string
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean }
  uniforms?: Record<string, UniformValue>
  vertex?: Record<string, string>; fragment?: Record<string, string>
}
type ShaderWithDefines = THREE.ShaderLibShader & { defines?: Record<string, string | number | boolean> }

function extendMaterial<T extends THREE.Material = THREE.Material>(
  BaseMaterial: new (params?: THREE.MaterialParameters) => T,
  cfg: ExtendMaterialConfig,
): THREE.ShaderMaterial {
  const physical = THREE.ShaderLib.physical as ShaderWithDefines
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical
  const uniforms: Record<string, THREE.IUniform> = THREE.UniformsUtils.clone(baseUniforms)
  const defaults = new BaseMaterial(cfg.material || {}) as T & {
    color?: THREE.Color; roughness?: number; metalness?: number
    envMap?: THREE.Texture; envMapIntensity?: number
  }
  if (defaults.color) uniforms.diffuse.value = defaults.color
  if ("roughness" in defaults) uniforms.roughness.value = defaults.roughness
  if ("metalness" in defaults) uniforms.metalness.value = defaults.metalness
  if ("envMapIntensity" in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity
  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === "object" && "value" in u
      ? (u as THREE.IUniform<unknown>) : ({ value: u } as THREE.IUniform<unknown>)
  })
  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ""}\n${baseVert}`
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ""}\n${baseFrag}`
  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) vert = vert.replace(inc, `${inc}\n${code}`)
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) frag = frag.replace(inc, `${inc}\n${code}`)
  return new THREE.ShaderMaterial({
    defines: { ...(physical.defines ?? {}) }, uniforms, vertexShader: vert,
    fragmentShader: frag, lights: true, fog: !!cfg.material?.fog,
  })
}

const CanvasWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <Canvas dpr={[1, 2]} frameloop="always" className="w-full h-full relative">{children}</Canvas>
)
const hexToNormalizedRGB = (hex: string): [number, number, number] => {
  const c = hex.replace("#", "")
  return [parseInt(c.slice(0,2),16)/255, parseInt(c.slice(2,4),16)/255, parseInt(c.slice(4,6),16)/255]
}

const noise = `
float random(in vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
float noise(in vec2 st){vec2 i=floor(st);vec2 f=fract(st);float a=random(i);float b=random(i+vec2(1.,0.));float c=random(i+vec2(0.,1.));float d=random(i+vec2(1.,1.));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t){return t*t*t*(t*(t*6.-15.)+10.);}
float cnoise(vec3 P){
  vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.);Pi0=mod(Pi0,289.);Pi1=mod(Pi1,289.);
  vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.);
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;
  vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0/7.;vec4 gy0=fract(floor(gx0)/7.)-.5;gx0=fract(gx0);vec4 gz0=vec4(.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.));gx0-=sz0*(step(0.,gx0)-.5);gy0-=sz0*(step(0.,gy0)-.5);
  vec4 gx1=ixy1/7.;vec4 gy1=fract(floor(gx1)/7.)-.5;gx1=fract(gx1);vec4 gz1=vec4(.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.));gx1-=sz1*(step(0.,gx1)-.5);gy1-=sz1*(step(0.,gy1)-.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;
  float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
  float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);
  vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}`

interface BeamsProps { beamWidth?:number; beamHeight?:number; beamNumber?:number; lightColor?:string; speed?:number; noiseIntensity?:number; scale?:number; rotation?:number }

function createStackedPlanesBufferGeometry(n:number, width:number, height:number, spacing:number, heightSegments:number): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry()
  const numVertices = n*(heightSegments+1)*2, numFaces = n*heightSegments*2
  const positions = new Float32Array(numVertices*3), indices = new Uint32Array(numFaces*3), uvs = new Float32Array(numVertices*2)
  let vOff=0, iOff=0, uOff=0
  const totalWidth = n*width+(n-1)*spacing, xBase = -totalWidth/2
  for (let i=0; i<n; i++) {
    const xOff=xBase+i*(width+spacing), uvX=Math.random()*300, uvY=Math.random()*300
    for (let j=0; j<=heightSegments; j++) {
      const y=height*(j/heightSegments-.5)
      positions.set([xOff,y,0, xOff+width,y,0], vOff*3)
      uvs.set([uvX,j/heightSegments+uvY, uvX+1,j/heightSegments+uvY], uOff)
      if (j<heightSegments) { const a=vOff,b=vOff+1,c=vOff+2,d=vOff+3; indices.set([a,b,c,c,b,d],iOff); iOff+=6 }
      vOff+=2; uOff+=4
    }
  }
  geometry.setAttribute("position",new THREE.BufferAttribute(positions,3))
  geometry.setAttribute("uv",new THREE.BufferAttribute(uvs,2))
  geometry.setIndex(new THREE.BufferAttribute(indices,1))
  geometry.computeVertexNormals()
  return geometry
}

const MergedPlanes = forwardRef<THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>,{material:THREE.ShaderMaterial;width:number;count:number;height:number}>(
  ({material,width,count,height},ref) => {
    const mesh = useRef<THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>>(null!)
    useImperativeHandle(ref, ()=>mesh.current)
    const geometry = useMemo(()=>createStackedPlanesBufferGeometry(count,width,height,0,100),[count,width,height])
    useFrame((_,delta)=>{ mesh.current.material.uniforms.time.value+=0.1*delta })
    return <mesh ref={mesh} geometry={geometry} material={material} />
  }
)
MergedPlanes.displayName="MergedPlanes"

const PlaneNoise = forwardRef<THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>,{material:THREE.ShaderMaterial;width:number;count:number;height:number}>(
  (props,ref)=><MergedPlanes ref={ref} material={props.material} width={props.width} count={props.count} height={props.height} />
)
PlaneNoise.displayName="PlaneNoise"

const DirLight:FC<{position:[number,number,number];color:string}>=({position,color})=>{
  const dir=useRef<THREE.DirectionalLight>(null!)
  useEffect(()=>{
    if(!dir.current) return
    const cam=dir.current.shadow.camera as THREE.Camera&{top:number;bottom:number;left:number;right:number;far:number}
    cam.top=24;cam.bottom=-24;cam.left=-24;cam.right=24;cam.far=64;dir.current.shadow.bias=-0.004
  },[])
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />
}

const Beams:FC<BeamsProps>=({beamWidth=2,beamHeight=15,beamNumber=12,lightColor="#ffffff",speed=2,noiseIntensity=1.75,scale=0.2,rotation=0})=>{
  const meshRef=useRef<THREE.Mesh<THREE.BufferGeometry,THREE.ShaderMaterial>>(null!)
  const beamMaterial=useMemo(()=>extendMaterial(THREE.MeshStandardMaterial,{
    header:`varying vec3 vEye;varying float vNoise;varying vec2 vUv;varying vec3 vPosition;uniform float time;uniform float uSpeed;uniform float uNoiseIntensity;uniform float uScale;\n${noise}`,
    vertexHeader:`float getPos(vec3 pos){vec3 noisePos=vec3(pos.x*0.,pos.y-uv.y,pos.z+time*uSpeed*3.)*uScale;return cnoise(noisePos);}
vec3 getCurrentPos(vec3 pos){vec3 newpos=pos;newpos.z+=getPos(pos);return newpos;}
vec3 getNormal(vec3 pos){vec3 curpos=getCurrentPos(pos);vec3 nextposX=getCurrentPos(pos+vec3(0.01,0.,0.));vec3 nextposZ=getCurrentPos(pos+vec3(0.,-0.01,0.));vec3 tangentX=normalize(nextposX-curpos);vec3 tangentZ=normalize(nextposZ-curpos);return normalize(cross(tangentZ,tangentX));}`,
    fragmentHeader:"",
    vertex:{"#include <begin_vertex>":"transformed.z+=getPos(transformed.xyz);","#include <beginnormal_vertex>":"objectNormal=getNormal(position.xyz);"},
    fragment:{"#include <dithering_fragment>":"float randomNoise=noise(gl_FragCoord.xy);gl_FragColor.rgb-=randomNoise/15.*uNoiseIntensity;"},
    material:{fog:true},
    uniforms:{diffuse:new THREE.Color(...hexToNormalizedRGB("#000000")),time:{shared:true,mixed:true,linked:true,value:0},roughness:0.3,metalness:0.3,uSpeed:{shared:true,mixed:true,linked:true,value:speed},envMapIntensity:10,uNoiseIntensity:noiseIntensity,uScale:scale},
  }),[speed,noiseIntensity,scale])
  return (
    <CanvasWrapper>
      <group rotation={[0,0,degToRad(rotation)]}>
        <PlaneNoise ref={meshRef} material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <DirLight color={lightColor} position={[0,3,10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={["#000000"]} />
      <PerspectiveCamera makeDefault position={[0,0,20]} fov={30} />
    </CanvasWrapper>
  )
}

// ── Phone mockup ──────────────────────────────────────────────────────────────

function PhoneMockup() {
  const dates = [null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center shrink-0 mt-10 lg:mt-0"
    >
      {/* Glow rings */}
      <div className="absolute w-72 h-72 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-56 h-56 bg-cyan-400/10 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite_0.5s]" />

      {/* Phone frame with float animation */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[220px] h-[440px] sm:w-[260px] sm:h-[520px] bg-[#0d0d0d] rounded-[38px] border border-white/15 shadow-2xl shadow-cyan-400/10 overflow-hidden"
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#0d0d0d] rounded-b-2xl z-10 flex items-center justify-center">
          <div className="w-8 h-1 rounded-full bg-white/10" />
        </div>
        {/* Screen */}
        <div className="absolute inset-0 top-6 bg-[#111] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-black/60 px-4 pt-2 pb-2.5 border-b border-white/5">
            <p className="text-white/40 text-[9px] tracking-widest uppercase">Frizerski salon Ana</p>
            <p className="text-white font-bold text-[13px]">Zakazi termin</p>
          </div>
          {/* Service */}
          <div className="px-3 pt-3 pb-2">
            <p className="text-white/40 text-[8px] uppercase tracking-wider mb-1.5">Usluga</p>
            <div className="space-y-1">
              <div className="bg-cyan-400/15 border border-cyan-400/40 rounded-lg px-2.5 py-1.5 flex justify-between items-center">
                <span className="text-white text-[10px] font-medium">Zensko sisanje</span>
                <span className="text-cyan-400 text-[9px]">45 min &middot; 2500 RSD</span>
              </div>
              {[["Bojenje kose","90 min"],["Feniranje","30 min"]].map(([s,t])=>(
                <div key={s} className="bg-white/5 rounded-lg px-2.5 py-1.5 flex justify-between items-center">
                  <span className="text-white/60 text-[10px]">{s}</span>
                  <span className="text-white/30 text-[9px]">{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Calendar */}
          <div className="px-3 pb-2">
            <p className="text-white/40 text-[8px] uppercase tracking-wider mb-1.5">Januar 2026</p>
            <div className="bg-white/5 rounded-xl p-2">
              <div className="grid grid-cols-7 mb-1">
                {['P','U','S','\u010C','P','S','N'].map((d,i)=>(
                  <div key={i} className="text-center text-white/30 text-[8px]">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px">
                {dates.map((d,i)=>(
                  <div key={i} className={`text-center text-[8px] rounded py-0.5 leading-4 ${
                    d===15 ? 'bg-cyan-400 text-black font-bold' :
                    !d ? '' :
                    d<8 ? 'text-white/25' :
                    'text-white/60'
                  }`}>{d??''}</div>
                ))}
              </div>
            </div>
          </div>
          {/* Time slots */}
          <div className="px-3 pb-2">
            <p className="text-white/40 text-[8px] uppercase tracking-wider mb-1.5">Termini &mdash; cet 15 jan</p>
            <div className="flex flex-wrap gap-1">
              {['09:00','10:30','12:00','14:00','15:30'].map((t,i)=>(
                <span key={t} className={`px-2 py-1 rounded-lg text-[9px] font-medium ${
                  i===1 ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/60'
                }`}>{t}</span>
              ))}
            </div>
          </div>
          {/* CTA */}
          <div className="px-3 mt-auto pb-4">
            <div className="bg-cyan-400 rounded-xl py-2.5 text-center">
              <span className="text-black font-bold text-[11px]">Potvrdi zakazivanje &rarr;</span>
            </div>
            <p className="text-white/25 text-[8px] text-center mt-1.5">Potvrda stize SMS-om</p>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-white/20 rounded-full" />
      </motion.div>

      {/* Floating notification - animated */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 -right-2 sm:top-12 sm:-right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-3 py-2 shadow-xl"
      >
        <p className="text-white/50 text-[8px]">Nova rezervacija</p>
        <p className="text-white font-semibold text-[10px]">Marija M. &middot; 10:30</p>
        <p className="text-cyan-400 text-[8px]">Upravo zakazano</p>
      </motion.div>

      {/* Second floating element - bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 -left-4 sm:bottom-20 sm:-left-8 bg-emerald-500/15 backdrop-blur-xl border border-emerald-500/25 rounded-2xl px-3 py-2 shadow-xl"
      >
        <p className="text-emerald-400 text-[8px] font-semibold">+23% vise termina</p>
        <p className="text-white/50 text-[8px]">ovog meseca</p>
      </motion.div>
    </motion.div>
  )
}

// ── Hero component ────────────────────────────────────────────────────────────

export default function EtherealBeamsHero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background beams */}
      <div className="absolute inset-0 z-0">
        <Beams beamWidth={2.5} beamHeight={18} beamNumber={15} lightColor="#ffffff" speed={2.5} noiseIntensity={2} scale={0.15} rotation={43} />
      </div>
      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center pt-20 pb-10">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-20">

            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 text-sm text-cyan-400 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Specijalizovani za male servisne biznise u Srbiji
              </motion.div>

              {/* Headline - staggered word reveal */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
              >
                Koliko klijenata ste<br />
                izgubili danas jer{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x"
                >
                  nisu mogli da<br className="hidden sm:block" /> zakažu online?
                </motion.span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              >
                Pravimo sistem za online zakazivanje i profesionalni web sajt koji radi za vas
                <strong className="text-white"> 24/7</strong> - čak i dok spavate.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
              >
                <a
                  href="#kontakt"
                  className="group relative inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40 hover:scale-105"
                >
                  <span className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
                  Zakažite besplatan razgovor
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
                <a
                  href="#resenje"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium text-base px-6 py-4 rounded-full transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
                >
                  Pogledaj kako funkcioniše
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-sm text-white/50"
              >
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_,i)=>(
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: "backOut" }}
                      className="text-cyan-400 text-base"
                    >
                      ★
                    </motion.span>
                  ))}
                  <span className="ml-1 text-white/70 font-medium">10+ zadovoljnih klijenata</span>
                </div>
                <span className="hidden sm:block text-white/20">&middot;</span>
                <span>Dostupni 7 dana u nedelji</span>
              </motion.div>
            </div>

            {/* Right: phone mockup - NOW VISIBLE ON ALL SCREENS */}
            <PhoneMockup />

          </div>
        </div>
      </div>
    </section>
  )
}
