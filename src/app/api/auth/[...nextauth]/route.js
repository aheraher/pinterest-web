// import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github";
// const handler = NextAuth({
//     providers: [
//         GitHubProvider({
//           clientId: process.env.GITHUB_ID,
//           clientSecret: process.env.GITHUB_SECRET
//         })
//       ]

// })

// export { handler as GET, handler as POST }

import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
    // secret: process.env.NEXTAUTH_SECRET Wvzb
  ]
})

export { handler as GET, handler as POST }