const path = require('path');
const fs = require('fs');

fs.readFile('bible.json', 'utf-8', function(err, data){
    if(err) console.log(err);
    let datas = JSON.parse(data);
    let ndata = {
        version: data.version,
        books: []
    };
    ndata.books = [];
    for(let book of datas.books){
        let b = {
            name: book.name,
            number: book.number,
            chapters: []
        }
        b.chapters = [];
        for(let cont of book.content){
            if(b.chapters.length == 0){
                b.chapters.push({
                    number: cont.chapter,
                    content: [{
                        verse: cont.verse,
                        content: cont.content
                    }]
                })
                b.chapters[0].content = [{
                    verse: cont.verse,
                    content: cont.content
                }];
            }else if(b.chapters[b.chapters.length - 1].number == cont.chapter){
                b.chapters[b.chapters.length - 1].content.push({
                    verse: cont.verse,
                    content: cont.content
                });
            }else{
                b.chapters.push({
                    number: cont.chapter,
                    content: [{
                        verse: cont.verse,
                        content: cont.content
                    }]
                });
            }
        }
        ndata.books.push(b);
    }
    fs.writeFile('bible-clean.json', JSON.stringify(ndata, null, 4), 'utf-8', function (error) {
        if (error) console.log(error)
    });
});