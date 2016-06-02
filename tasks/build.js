module.exports = function (grunt) {
  "use strict";

  grunt.config.merge({
    bowerdir: "bower_components",
    copy: {
      html: {
        src: ["*.html"],
        expand: true,
        cwd: "html/",
        dest: "build/"
      },
      vendorjs: {
        src: ["es6-shim/es6-shim.min.js",
          "es6-shim/es6-shim.map"],
        expand: true,
        cwd: "bower_components/",
        dest: "build/vendor/"
      },
      config: {
        src: ["config.json"],
        expand: true,
        cwd: ".",
        dest: "build/"
      },
      robotoSlab: {
        src: ["**/*-Regular.*",
          "**/*-Bold.*"
        ],
        expand: true,
        dest: "build/fonts/",
        filter: 'isFile',
        flatten: true,
        cwd: "bower_components/roboto-slab-fontface-kit/fonts"
      },
      roboto: {
        src: ["fonts/*-Regular.*"
        ],
        expand: true,
        dest: "build/",
        cwd: "bower_components/roboto-fontface"
      },
      ionicons: {
        src: ["fonts/*"],
        expand: true,
        dest: "build/",
        cwd: "assets/icons/"
      }
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: "compressed"
      },
      dist: {
        files: {
          "build/style.css": "scss/main.scss"
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require("autoprefixer")({
            browsers: ["last 2 versions"]
          })
        ]
      },
      dist: {
        src: "build/style.css"
      }
    },
    inline: {
      dist: {
        options: {
          cssmin: true,
          uglify: true
        },
        src: "build/index.html",
        dest: "build/index.html"
      }
    },
    inlinedata: {
      injs: {
        expand: true,
        cwd: '.',
        src: ['build/*.html'],
        ext: '.html'
      }
    },
    "bower-install-simple": {
      options: {
        directory: "<%=bowerdir%>",
        color: true,
        interactive: false,
        production: true
      },
      "prod": {
        options: {
          production: true
        }
      }
    },
    requirejs: {
      default: {
        options: {
          baseUrl: "lib",
          name: "../bower_components/almond/almond",
          mainConfigFile: "app.js",
          include: "../app",
          out: "build/app.js",
          build: true
        }
      },
      dev: {
        options: {
          baseUrl: "lib",
          name: "../bower_components/almond/almond",
          mainConfigFile: "app.js",
          include: "../app",
          optimize: "none",
          out: "build/app.js",
          build: false
        }
      }
    },
    cachebreaker: {
      default: {
        options: {
          match: ['app.js']
        },
        files: {
          src: ['build/index.html']
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-bower-install-simple");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-inline");
  grunt.loadNpmTasks('grunt-inline-data');
  grunt.loadNpmTasks("grunt-cache-breaker");
};
