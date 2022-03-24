// var isThisWeek = dateFns.isThisWeek

// function addWindow (index) {
//   return `<div class="blog-window" id="${index}">
//             <div class="top-menu">
//               <div>
//                 <span class="red" tooltip-flow="top" tooltip="Nope, it doesn't work :P"></span>
//                 <span class="orange" ></span>
//                 <span class="green" ></span>
//               </div>
//               <div>
//                 <span class="date">2017 January 30th</span>
//               </div>
//             </div>
//             <div class="inner">
//               <h4 class="new">>_ </h4>
//               <h3 class="data-title">4 Tips To Improve Productivity</h3>
//               <h5 class="description">Hello world, my name is Tim</h5>
//               <a class="link" href="hello" target="_blank">Read More</a>
//             </div>
//             <div class="tags">
//               <span id="tag_${index}0" tooltip-flow='top'>⚛️</span>
//               <span id="tag_${index}1" tooltip-flow='top'>💻</span>
//               <span id="tag_${index}2" tooltip-flow='top'>🧘🏻‍♂️</span>
//               <span id="tag_${index}3" tooltip-flow='top'>🖥</span>
//               <span id="tag_${index}4" tooltip-flow='top'>🎮</span>
//             </div>
//           </div>
//   `
// }

// function truncateBefore (str, pattern) {
//   let result = str.slice(str.indexOf(pattern) + pattern.length);
//   let output = ""
//   for (let i = 0; i < result.length; i++) {
//     output += result[i]
//     if (result[i+1] === "<" && result[i+2] === "/") {
//       break
//     }
//   }
//   return output
// }

// function emojiUnicode (emoji) {
//   let hex = emoji.codePointAt(0).toString(16)
//   let emo = String.fromCodePoint("0x"+hex);
//   return emo
// };

// function changeTags(tag) {
//   switch (tag) {
//     case "productivity"             : return emojiUnicode("🚀")
//     case "startup"                  : return emojiUnicode("💸")
//     case "entrepreneurship"         : return emojiUnicode("🤑")
//     case "writing"                  : return emojiUnicode("✍🏻")
//     case "health"                   : return emojiUnicode("🏥")
//     case "life"                     : return emojiUnicode("🙏🏻")
//     case "life-lessons"             : return emojiUnicode("🎓")
//     case "education"                : return emojiUnicode("📚")
//     case "programming"              : return emojiUnicode("💻")
//     case "politics"                 : return emojiUnicode("🚔")
//     case "travel"                   : return emojiUnicode("🛫")
//     case "design"                   : return emojiUnicode("🎨")
//     case "love"                     : return emojiUnicode("💻")
//     case "javascript"               : return emojiUnicode("🧩")
//     case "technology"               : return emojiUnicode("📱")
//     case "business"                 : return emojiUnicode("📈")
//     case "coding"                   : return emojiUnicode("🖥")
//     case "software-development"     : return emojiUnicode("📡")
//     case "self-improvement"         : return emojiUnicode("🧘🏻‍♂️")
//     case "careers"                  : return emojiUnicode("📈")
//     case "league-of-legends"        : return emojiUnicode("🎮")
//     case "self-taught"              : return emojiUnicode("💡")
//     case "music"                    : return emojiUnicode("🎹")
//     case "sports"                   : return emojiUnicode("🏀")
//     case "food"                     : return emojiUnicode("🍔")
//     case "art"                      : return emojiUnicode("🖌")
//     default                         : return emojiUnicode("🌈")
//   }
// }

// const url = " https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40T31K"


// var data = {rss: "https://medium.com/feed/@T31K"}
// $.get(url, data, function(response){
// //Checking Response Status
// if (response.status == 'ok') {

//   let res = response.items
//   // console.log(res)
//   res.map((items, index) => {
//     // Duplicate Windows
//     $("section.blog .blog-container").append(addWindow(index))

//     // Clean up & Append Date
//     let {pubDate}= items
//     let date = $.format.date(pubDate, "dd MMM yyyy")

//     let new_tag_checker = isThisWeek(pubDate)

//     if (new_tag_checker) {
//       $(`#${index} .date`).text(date)
//       $(`#${index} .new`).text('>_ NEW')
//       $(`#${index} .new`).addClass('rainbow')
//     } else {
//       $(`#${index} .date`).text(date)
//     }

//     // Clean up & Append Title
//     let {title} = items
//     $(`#${index} .data-title`).text(title.replace("&amp;", "&"))

//     if (title === "How to Create a Kick-ass Portfolio Site that will WOW Your Next Employer"){
//       $(`#${index} .new`).text('>_  ⭐️🔥')
//       $(`#${index} .new`).addClass('rainbow')
//     }
//     // Clean up & Append Description
//     let {description} = items
//     let final_description = truncateBefore(description, "\"medium-feed-snippet\">").replace("&amp;", "&")
//     $(`#${index} .description`).text(final_description)

//     // Clean up & Append Categories
//     let {categories} = items
//     for (let i = 0; i < 5; i++) {
//       let final_categories = changeTags(categories[i])
//       $(`#tag_${index}${i}`).text(final_categories)
//       $(`#tag_${index}${i}`).attr('tooltip', `${categories[i][0].toUpperCase()+categories[i].slice(1).replaceAll('-',' ')}`)
//     }

//     // Clean up & Append Link
//     let {link} = items
//     $(`#${index} .link`).attr('href', link)


//   })
//   }
// })


