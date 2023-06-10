export default function (context) {
  console.log(context)
  const role = localStorage.getItem('role')
  const cabang = localStorage.getItem('cabang_id')
  if (context.$auth.loggedIn) {
    if (role === '2')
      if (
        context.route.path !== `/cabang/${cabang}/frontoffices` &&
        context.route.path !== `/cabang/${cabang}/overview`
      ) {
        return context.redirect(`/cabang/${cabang}/overview`)
      }
    if (role === '3')
      if (
        context.route.path === `/cabang/${cabang}/user` ||
        context.route.path === `/cabang/${cabang}/cabang`
      ) {
        return context.redirect(`/cabang/${cabang}/overview`)
      }
  }
}
