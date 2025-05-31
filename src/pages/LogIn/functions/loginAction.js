import { login } from "@/services/auth"

export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    await login(email, password)
    return { success: 'Login Successful!' }
  } catch (err) {
    return { error: 'Login Failed!' }
  }
}
