import { NextResponse } from "next/server"

export async function POST() {
  try {
    
    const response = NextResponse.json({})
    
    response.cookies.set("next-auth.session-token", "", { 
      expires: new Date(0),
      path: "/"
    })
    response.cookies.set("next-auth.csrf-token", "", { 
      expires: new Date(0),
      path: "/"
    })
    response.cookies.set("next-auth.callback-url", "", { 
      expires: new Date(0),
      path: "/"
    })
    response.cookies.set("__Secure-next-auth.session-token", "", { 
      expires: new Date(0),
      path: "/" 
    })
    
    return response
  } catch (error) {
    console.log('[ERROR] ❌:', error)
    return NextResponse.json({
      msg: 'Erro no servidor ao sair da sessão.'
    }, { status: 500 })
  }
} 