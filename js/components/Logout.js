import services from '../services.js'

const Logout = {
    template: `<div>Logging out...</div>`,
    created() {
        services.resetUser()
        this.$router.push('/')
    }
}

export { Logout }