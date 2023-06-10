export default function (context) {
  const cabang = localStorage.getItem('cabang_id')
  if (context.$auth.loggedIn && cabang && context.route.path === '/') {
    return context.redirect(`/cabang/${cabang}/overview`)
  }
}
