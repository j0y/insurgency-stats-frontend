// convert "images_sources/*" -set filename:base "%[basename]" -resize 100 "public/maps/%[filename:base].jpg"
function mapImage(map) {
    const prefix = '/maps/'

    switch (map) {
        case 'ministry_coop':
            return prefix + 'ministry.jpg'
        case 'ministry_open_coop':
            return prefix + 'ministry.jpg'
        case 'italy_coop':
            return prefix + 'italy.jpg'
        case 'siege_coop':
            return prefix + 'siege.jpg'
        case 'dedust1p2_aof':
            return prefix + 'de_dust.jpg'
        case 'crossbow':
            return prefix + 'crossbow.jpg'
        case 'depot_coop':
            return prefix + 'depot.jpg'
        case 'iron_express':
            return prefix + 'iron_express.jpg'
        case 'karkand_redux_p2':
            return prefix + 'karkand.jpg'
        case 'dry_canal_coop_v4':
            return prefix + 'dry_canal.jpg'
        case 'drycanal_coop':
            return prefix + 'dry_canal.jpg'
        case 'launch_control_coop_ws':
            return prefix + 'launch.jpg'
        case 'market_open_coop':
            return prefix + 'market_open.jpg'
        default:
            return prefix + 'default.png'
    }
}

export default mapImage;