import auth from "@/api/middlewares/auth"
import getValidateRole from "@/api/middlewares/validateRole"
import mw from "@/api/mw"
const handle = mw({
  GET: [
    auth,
    getValidateRole(["admin", "author"]),
    ({ res }) => {
      res.send("ok")
    },
  ],
})

export default handle
