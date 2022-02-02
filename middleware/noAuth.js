export default function ({ app, redirect }) {
  if (app.$cookiz.get("verifyCode") && app.$cookiz.get("authToken")) {
    return redirect("/home");
  }
}
