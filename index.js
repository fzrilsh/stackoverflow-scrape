const google = require('google-it')
const {JSDOM} = require('jsdom')

function nextDiv(document, attr, cond){
    var div = Array.from(document.querySelectorAll(attr))
    var startIndex = div.findIndex(cond)

    if(startIndex < 0) return []
    
    var result = []
    for (startIndex; startIndex < div.length; startIndex++) {
        const currDiv = div[startIndex];
        result.push(currDiv)
        startIndex += Array.from(currDiv.querySelectorAll('div')).length
    }

    return result
}

/**
 * 
 * @param {String} query - Query to search on stackoverflow
 * @returns 
 */
async function stackoverflow(query) {
    const results = await google({'query': query+' site:stackoverflow.com '})
    var findSite = results.find(v => v.link.startsWith("https://stackoverflow.com/questions"))

    const overflow = await fetch(findSite.link).then(v => v.text())
    const { document } = (new JSDOM(overflow)).window
    const hdiv = nextDiv(document, 'div', (v) => v?.id == 'question-header')

    var title = hdiv[0].querySelector('h1 > a').textContent
    var openedForum = hdiv[1].querySelector('time').textContent
    var modifiedForum = hdiv[1].querySelector('a').textContent
    var viewer = hdiv[1].querySelector('div[class="flex--item ws-nowrap mb8"]').title.split(' ')[1]

    var question = document.querySelectorAll('.postcell .s-prose')[0].textContent
    var tagquest = Array.from(document.querySelectorAll('.post-taglist li')).map(v => v.textContent).join(', ')
    var [avatar, askedDate, author] = [...new Set(Array.from(document.querySelector('.post-signature.owner').querySelectorAll('div,a')).map(v => v.querySelector('img') ? v.querySelector('img').src : v.querySelector('span') ? v.querySelector('span').textContent : v.textContent))]
    var answers = Array.from(document.querySelectorAll('#answers .answercell')).map(v => {
        return {
            answer: v.querySelector('.s-prose').textContent,
            author: [v.querySelector('span[class="d-none"]').textContent, v.querySelector('img').src]
        }
    })
    
    return {
        title,
        date_opened_question: openedForum,
        date_modified_question: modifiedForum,
        viewer_forum: viewer,
        question,
        question_tag: tagquest,
        author_question: {
            name:author, avatar, askedDate
        },
        answers
    }
}

module.exports = stackoverflow