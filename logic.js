$(document).ready(function() {
  $('ul').hide();
  $('input').keyup(function(event){
    if(event.keyCode == 13){
        $('button').click();
    }
});

  $('button').click(getSubredditpics)

  function getSubredditpics(){
    var subreddit = $('input').val();
    $('input').val('');
    if (!subreddit){console.log('Nothing,yo')};
    $.getJSON('https://www.reddit.com/r/'+subreddit+'/.json',function(json) {
    var imageList = [];
    var link = json.data.children
    console.log(link[9]);
    for(var i = 0; i<link.length; i++){
      var imgLink = link[i].data.url;
      //TODO: Need to refactor out the ul append
        if((/.gifv$/i).test(imgLink)){
          imgLink = imgLink.replace('.gifv','.gif');
        }
        else if ((/gfycat.com/i).test(imgLink)){
          var catID = imgLink.slice(imgLink.lastIndexOf('/')+1)
          var imgLink = 'https://giant.gfycat.com/'+catID+'.gif';
        }
        else if((/reddit.com\/r/gi).test(imgLink)){continue;}
        else if ((/imgur/i).test(imgLink)) {
          if ((/\/a\/|\/gallery\//i).test(imgLink)) {
            continue;
          }
          else{imgLink+='.jpg';}
        }
      imageList.push('<li><img src="'+imgLink+'"></li>');
    }
    $('ul').append(imageList);
    console.log('Hi');
  });
  $('li').hide();
  $('ul').show();
  $('li').slideUp('slow');


};
});
/*TODO:
    //check for empty array. return an error
    //check for actual image links not just all
    //next page
    //gif toggle
    //nsfw toggle, pages and images
    //separate by commas
    //continue adding on
    //optimizations
    //formats - eroshare,
    //complete word
    //Angularize?
    //keyframes
    //&amp?
    //webm
    var objects = {};
    check for all 404;
    alt as the title of thread
    make hover and click effects fancy

    for (var x = 0; x < 100; x++) {
      objects[x] = {name: etc};
    }
*/
