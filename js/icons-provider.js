import {
    Gamepad,
    User,
    LogOut,
    Cross,
    PawPrint,
    Cog,
    Trophy,
    ChevronDownCircle,
    Share,
    //Facebook,
    //Instagram
} from 'lucide-vue'

const icons = {
    'icon-gamepad': Gamepad,
    'icon-user': User,
    'icon-log-out': LogOut,
    'icon-cross': Cross,
    'icon-paw-print': PawPrint,
    'icon-cog': Cog,
    'icon-trophy': Trophy,
    'icon-chevron-down-circle': ChevronDownCircle,
    'icon-share': Share,
    //'icon-facebook': Facebook,
    //'icon-instagram': Instagram

}
export default {
    provide(app) {
        for (const icon in icons)
            app.component(icon, icons[icon])
        
        return app
    }
    
    
}