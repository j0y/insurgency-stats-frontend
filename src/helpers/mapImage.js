// convert "images_sources/*" -set filename:base "%[basename]" -resize 100 "public/maps/%[filename:base].jpg"
function mapImage(map) {
    const prefix = '/maps/'

    switch (map) {
        case 'ministry_coop':
            return prefix + 'ministry.jpg'
        case 'italy_coop':
            return prefix + 'italy.jpg'
        default:
            return prefix + 'default.png'
    }
}

export default mapImage;