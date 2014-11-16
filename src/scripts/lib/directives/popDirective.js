define(['./module'], function() {
  directives.directive('canvasPop', [function() {

    function random(min, max) {
      if(max){
        return Math.random() * (max - min) + min;
      } else {
        return Math.random() * min;
      }
    }

    var Particle = function(radius, speed, scale){
      this.radius = radius;
      this.speed = speed;
      this.scale = scale;
    }

    
    return {
      restrict: 'A',
      link: function(scope, $ele, attrs) {
        var Main = function(){
          var viewWidth
          var viewHeight;
          var canvas;
          var context;
          var particles;
          var mouse;
          var count;

          function init(){
            viewWidth = window.innerWidth;
            viewHeight = window.innerHeight;
            
            mouse = {x:0, y:0};
            count = 0;

            particles = [];
            canvas = document.createElement('canvas');
            context = canvas.getContext("2d");
            $ele.append(canvas);

            for(var i=0; i < 120; i++){
              var particle  = new Particle(random(100, 400), random(20, 90), random(2.2, 1));
              particle.x = random(-200, 200);
              particle.y = random(-200, 200);
              particles.push(particle);
            }

            addEvents();
            loop();
          }


          function loop(){
            context.fillStyle = "#d4e0cf";
            context.fillRect(0, 0, viewWidth, viewHeight);
           
            context.translate(viewWidth/2, viewHeight/2);
            
         
            var magnitude = 120;
            if(mouse.x !== 0  || mouse.y !== 0){
              magnitude = Math.sqrt(Math.pow(mouse.x , 2) + Math.pow(mouse.y, 2));
              magnitude = Math.min(500, Math.max(50, magnitude));
            }
            
            for(var i=0; i < particles.length; i++){
              context.save(); 
              var particle = particles[i];
              var ang = i * (Math.PI * 2/particles.length) + count/100;
              var x = Math.cos(ang) * particle._radius;
              var y = -Math.sin(ang) * particle._radius;      
              context.translate(x,  y);      context.scale(particle.scale,particle.scale);
              context.rotate(ang + Math.PI/2);
              
              if(i%2){
                context.fillStyle = "#339ba1";
                context.strokeStyle = 'transparent';
              }else{
                context.fillStyle = "#d0471f";
                context.lineWidth = 0;
                context.strokeStyle =  "transparent";
              }
              
              context.beginPath();
              context.moveTo(0, 0 - 20);
                   context.arc(50,25,5,0,2*Math.PI);
              context.closePath();
              context.fill();
              context.stroke();
            
              
              
             
              
              particle._radius = 10 + Math.abs(Math.sin(count/particle.speed)*particle.radius * magnitude/100);
              

              context.restore();
            }
          
           
            context.translate(-viewWidth/2, -viewHeight/2);
          
            requestAnimationFrame(loop);
            count++;
          }

          function resize(){
            viewWidth = window.innerWidth;
            viewHeight = window.innerHeight;
            canvas.width = viewWidth;
            canvas.height = viewHeight;
          }
          
          

          function addEvents(){
            window.onresize = resize;
            
            canvas.addEventListener('mousemove', function(evt) {
              mouse = getMousePos(canvas, evt);
            }, false);
            
            resize();
          }
          
          return {
            init:init
          }
          
        }();

        Main.init();
      }
    };
  }]);
});




