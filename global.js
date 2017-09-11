// Generated by CoffeeScript 1.12.7
(function() {
  var Graphics,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.onload = (function(_this) {
    return function() {
      window.graphics = new Graphics();
      document.addEventListener("keydown", function(e) {
        if (e.keyCode === 37) {
          return graphics.prevSlide();
        } else if (e.keyCode === 39) {
          return graphics.nextSlide();
        }
      }, false);
      new Hammer(document.body).on('swipeleft swiperight', function(e) {
        if (e.type === 'swiperight') {
          return graphics.prevSlide();
        } else if (e.type === 'swipeleft') {
          return graphics.nextSlide();
        }
      });
    };
  })(this);

  Graphics = (function() {
    function Graphics() {
      this.render = bind(this.render, this);
      this.resize = bind(this.resize, this);
      this.spheres = [];
      this.gray_image = [];
      this.count = 0;
      this.settings = {
        slide: 0,
        slide_max: 4,
        scale: 0.01,
        pinch_x: 0,
        pinch_y: 0,
        ease: Power2.easeOut,
        camera_x: 0,
        camera_y: 50,
        camera_z: 1000,
        space: 100,
        amount_x: 60,
        amount_z: 40,
        img_scale: 0,
        stop: false,
        color: "#91e70b",
        clear_color: "#000000",
        play_animation: false,
        frame: 0
      };
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
      this.camera.position.z = this.settings.camera_z;
      this.camera.position.y = this.settings.camera_y;
      this.renderer = new THREE.CanvasRenderer();
      this.context = this.renderer.domElement.getContext('2d');
      this.renderer.setClearColor(this.settings.clear_color);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMapEnabled = true;
      this.renderer.shadowMapType = THREE.PCFSoftShadowMap;
      this.renderer.domElement.id = "dots";
      document.body.appendChild(this.renderer.domElement);
      this.insertDots();
      this.gray_image = this.grayImage('anim');
      setTimeout((function(_this) {
        return function() {
          return _this.changeSlide();
        };
      })(this), 100);
      window.addEventListener('resize', (function(_this) {
        return function() {
          return _this.resize();
        };
      })(this), false);
      this.render();
      return;
    }

    Graphics.prototype.resize = function() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    };

    Graphics.prototype.render = function() {
      var i, j, ref, ref1, sphere, sphere_all, x, z;
      requestAnimationFrame(this.render);
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.camera.position.x = this.settings.camera_x;
      this.camera.position.y = this.settings.camera_y;
      this.camera.position.z = this.settings.camera_z;
      this.camera.lookAt(this.scene.position);
      this.renderAnimation(this.gray_image);
      this.counter = 0;
      for (x = i = 0, ref = this.settings.amount_x; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
        for (z = j = 0, ref1 = this.settings.amount_z; 0 <= ref1 ? j <= ref1 : j >= ref1; z = 0 <= ref1 ? ++j : --j) {
          sphere_all = this.spheres[this.counter++];
          sphere = sphere_all.obj;
          sphere.position.y = (Math.sin((x + this.count) * 0.3) * 50) * this.settings.pinch_x + (Math.sin((z + this.count) * 0.5) * 50) * this.settings.pinch_y;
          sphere.scale.x = sphere.scale.y = (sphere_all.fixed_scale * this.settings.img_scale) + (Math.sin((x + this.count) * 0.3) + 1) * 4 * this.settings.scale + (Math.sin((z + this.count) * 0.5) + 1) * 4 * this.settings.scale;
        }
      }
      this.renderer.render(this.scene, this.camera);
      this.count += 0.1;
    };

    Graphics.prototype.nextSlide = function() {
      if (this.settings.slide < this.settings.slide_max) {
        this.settings.slide++;
        return this.changeSlide();
      }
    };

    Graphics.prototype.prevSlide = function() {
      if (this.settings.slide > 0) {
        this.settings.slide--;
        return this.changeSlide();
      }
    };

    Graphics.prototype.changeSlide = function() {
      if (this.settings.slide === 0) {
        TweenMax.to('.info', 2, {
          opacity: 1
        });
        TweenMax.to(this.settings, 5, {
          scale: 0.01
        });
      } else if (this.settings.slide === 1) {
        TweenMax.to('.info', 0.4, {
          opacity: 0
        });
        TweenMax.to(this.settings, 5, {
          scale: 1
        });
        TweenMax.to(this.settings, 1, {
          pinch_x: 0,
          ease: this.settings.ease
        });
      } else if (this.settings.slide === 2) {
        TweenMax.to(this.settings, 1, {
          pinch_x: 1,
          pinch_y: 0,
          ease: this.settings.ease
        });
        TweenMax.to(this.settings, 4, {
          camera_y: 200,
          camera_z: 1000
        });
      } else if (this.settings.slide === 3) {
        TweenMax.to(this.settings, 1, {
          pinch_y: 1,
          ease: this.settings.ease
        });
        TweenMax.to(this.settings, 4, {
          camera_y: 200
        });
        TweenMax.to(this.settings, 4, {
          img_scale: 0,
          camera_z: 1000
        });
      } else if (this.settings.slide === 4) {
        this.settings.play_animation = true;
        TweenMax.to(this.settings, 1, {
          pinch_x: 1,
          pinch_y: 1,
          ease: this.settings.ease
        });
        TweenMax.to(this.settings, 4, {
          camera_y: 1850,
          camera_z: 2900,
          img_scale: 1,
          onComplete: (function(_this) {
            return function() {
              return TweenMax.to(_this.settings, 4, {
                camera_y: 5000,
                camera_z: 100
              });
            };
          })(this)
        });
      }
    };

    Graphics.prototype.grayImage = function(id) {
      var array, canvas, counter, i, img, img_height, j, k, len, normalized, p, pixelData, ref, ref1, row_array, x, y;
      array = [];
      img = document.getElementById(id);
      canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
      for (x = i = 0, ref = img.width - 1; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
        for (y = j = 0, ref1 = img.height - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; y = 0 <= ref1 ? ++j : --j) {
          pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
          array.push((pixelData[0] / 255 + pixelData[1] / 255 + pixelData[2] / 255) / 3);
        }
      }
      img_height = img.height;
      row_array = [];
      normalized = [];
      counter = 1;
      for (k = 0, len = array.length; k < len; k++) {
        p = array[k];
        row_array.push(p);
        if (counter++ >= img_height) {
          normalized.push(row_array);
          counter = 1;
          row_array = [];
        }
      }
      return normalized;
    };

    Graphics.prototype.insertDots = function() {
      var i, j, ref, ref1, sphere, x, z;
      this.material = new THREE.SpriteCanvasMaterial({
        color: this.settings.color,
        program: (function(_this) {
          return function() {
            _this.context.beginPath();
            _this.context.arc(0, 0, 0.5, 0, Math.PI * 2, true);
            _this.context.fill();
          };
        })(this)
      });
      for (x = i = 0, ref = this.settings.amount_x; 0 <= ref ? i <= ref : i >= ref; x = 0 <= ref ? ++i : --i) {
        for (z = j = 0, ref1 = this.settings.amount_z; 0 <= ref1 ? j <= ref1 : j >= ref1; z = 0 <= ref1 ? ++j : --j) {
          sphere = new THREE.Sprite(this.material);
          this.spheres.push({
            obj: sphere,
            fixed_scale: null
          });
          sphere.position.x = x * this.settings.space - ((this.settings.amount_x * this.settings.space) / 2);
          sphere.position.z = z * this.settings.space - ((this.settings.amount_z * this.settings.space) / 2);
          this.scene.add(sphere);
        }
      }
    };

    Graphics.prototype.renderAnimation = function(array) {
      var counter, diff, frame_array, i, j, k, l, len, len1, limit, pixel, ref, ref1, row, sphere, start, temp_array, x, z;
      if (!this.settings.play_animation) {
        return;
      }
      frame_array = [];
      start = this.settings.frame++;
      limit = array.length - this.settings.amount_x;
      if (start > limit) {
        diff = start - limit;
        temp_array = array.slice(start, start + this.settings.amount_x).concat(array.slice(0, 0 + diff));
        if (diff > this.settings.amount_x) {
          return this.settings.frame = 0;
        }
      } else {
        temp_array = array.slice(start, start + this.settings.amount_x);
      }
      for (i = 0, len = temp_array.length; i < len; i++) {
        row = temp_array[i];
        for (j = 0, len1 = row.length; j < len1; j++) {
          pixel = row[j];
          frame_array.push(pixel);
        }
      }
      counter = 0;
      for (x = k = 0, ref = this.settings.amount_x; 0 <= ref ? k <= ref : k >= ref; x = 0 <= ref ? ++k : --k) {
        for (z = l = 0, ref1 = this.settings.amount_z; 0 <= ref1 ? l <= ref1 : l >= ref1; z = 0 <= ref1 ? ++l : --l) {
          sphere = this.spheres[counter];
          sphere.fixed_scale = frame_array[counter++] * 50;
        }
      }
    };

    return Graphics;

  })();

}).call(this);