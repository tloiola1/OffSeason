$(document).on('click', '#domestic')
{
    if (cities = 'US') {
        buildCards()
    }
}

$(document).on('click', '#international')
{
    if (cities != 'US') {
        buildCards()
    }
}