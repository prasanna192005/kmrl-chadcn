// app/api/call/route.ts
// import { NextRequest, NextResponse } from "next/server"

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json()
//     const { phone_number } = body

//     if (!phone_number) {
//       return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
//     }

//     const headers = {
//       Authorization: `${process.env.BLAND_API_KEY}`, // no "Bearer" here, matches new API
//       "Content-Type": "application/json",
//     }

//     const data = {
//       phone_number,
//       pathway_id: "40aa77fa-c2a0-48f3-b9a1-32b3d1123959", // keeping it empty for now
//     }

//     const response = await fetch("https://api.bland.ai/v1/calls", {
//       method: "POST",
//       headers,
//       body: JSON.stringify(data),
//     })

//     const result = await response.json()

//     return NextResponse.json({ success: true, data: result })
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, error: error.message || "Something went wrong" },
//       { status: 500 }
//     )
//   }
// }

// app/api/call/route.ts
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { phone_number } = body

    if (!phone_number) {
      return NextResponse.json({ success: false, error: "Phone number is required" }, { status: 400 })
    }

    const headers = {
      Authorization: `Bearer ${process.env.BLAND_API_KEY}`, // ✅ Bearer token
      "Content-Type": "application/json",
    }

    const data = {
      phone_number,
      voice: "June",
      wait_for_greeting: false,
      record: true,
      answered_by_enabled: true,
      noise_cancellation: false,
      interruption_threshold: 100,
      block_interruptions: false,
      max_duration: 12,
      model: "base",
      language: "en",
      background_track: "none",
      voicemail_action: "hangup",
      task: `Your Role: You are Praveen, from the internal project coordination team at Kochi Metro. Your job is to call different department heads and managers to track the progress of ongoing internal tasks and reports. You are a coordinator, not a senior executive.

Your Goal: You need to call a department head, get a status update on a specific task, remind them of the deadline, and if they say they need more time, you are authorized to update the deadline for them.

Example Dialogue
[You are calling the Head of the Operations Department]

Operations Head: Hello, [Operations Head's Name] speaking.

You (Praveen): നമസ്കാരം (Namaskaram) Sir. Main Praveen bol raha hoon, project coordination team se. Kya aapse do minute baat ho sakti hai?

Operations Head: Haan Praveen, bataiye.

You: Sir, main bas "Monthly Passenger Flow Report" ke status ke baare mein jaan ne ke liye call kar raha tha. Woh kahan tak pahuncha hai?

Operations Head: Haan, us par kaam chal raha hai. Hum final data ko cross-verify kar rahe hain.

You: Theek hai sir. Main aapko bas yaad dilana chahta tha ki report submit karne ki deadline iss Thursday, [Original Deadline Date], hai.

Operations Head: Oh, Thursday? Praveen, data verification mein thoda unexpected time lag gaya hai. Thursday tak complete karna thoda tight ho jayega.

You: Koi baat nahi sir, main samajh sakta hoon. Aapko kitna aur samay lagega? Main deadline update kar deta hoon.

Operations Head: Agar humein agle Monday tak ka samay mil jaaye, toh hum aaram se report submit kar denge.

You: Bilkul sir. Main system mein deadline ko update karke agla Monday, [New Deadline Date], kar deta hoon.

Operations Head: Perfect. Thanks for your help, Praveen.

You: Koi baat nahi sir. വളരെ നന്ദി (Valare nandi).







`
      // ⚠️ Keep task concise, not the full sample convo. 
      // You can still pass conversation examples separately if needed.
    }

    const response = await axios.post("https://api.bland.ai/v1/calls", data, { headers })

    return NextResponse.json({ success: true, data: response.data })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    )
  }
}
