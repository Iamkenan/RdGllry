$(document).ready(function() {
  $.getJSON('https://www.reddit.com/r/pics/.json',function(json) {
    var link = json.data.children
    console.log(link[9]);
    for(var i = 0; i<link.length; i++){
      var imgLink = link[i].data.url;
      //TODO: Need to refactor out the ul append
      if((/.gifv$/i).test(imgLink)){
        imgLink = imgLink.replace('.gifv','.gif');
        $('ul').append('<li><img src="'+imgLink+'"></li>');

      }
      else if ((/gfycat.com/i).test(imgLink)){
        var catID = imgLink.slice(imgLink.lastIndexOf('/')+1)
        var gfylink = 'https://giant.gfycat.com/'+catID+'.gif';
        $('ul').append('<li><img controls src="'+gfylink+'"></li>');
      }
      else if((/reddit.com\/r/gi).test(imgLink)){continue;}
      else if ((/imgur/i).test(imgLink)) {
        if ((/i.imgur/i).test(imgLink)) {
          $('ul').append('<li><img src="'+imgLink+'"></li>');
        }
        else if ((/\/a\/|\/gallery\//i).test(imgLink)) {
          continue;
        }
        else{$('ul').append('<li><img src="'+imgLink+'.jpg"></li>');}

      }
      else
      {$('ul').append('<li><img src="'+imgLink+'"></li>');}
    }
    $('ul').removeClass('hide');
  });
});
