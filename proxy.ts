import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const INSTAGRAM_PASSWORD = "1234"

function unauthorized() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Instagram", charset="UTF-8"',
    },
  })
}

export function proxy(request: NextRequest) {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized()
  }

  try {
    const encodedCredentials = authorization.slice(6)
    const decodedCredentials = atob(encodedCredentials)
    const separatorIndex = decodedCredentials.indexOf(":")

    if (separatorIndex === -1) {
      return unauthorized()
    }

    const password = decodedCredentials.slice(separatorIndex + 1)

    if (password !== INSTAGRAM_PASSWORD) {
      return unauthorized()
    }

    return NextResponse.next()
  } catch {
    return unauthorized()
  }
}

export const config = {
  matcher: "/instagram/:path*",
}
