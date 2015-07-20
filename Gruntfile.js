module.exports = function(grunt) {
    var srcJsDir = 'src/';
    var srcLessDir = 'src/';
    var buildDir = 'build/';
    var srcHtmlDir = 'src/html-controls'
  // configure grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: {
                src: [
                    srcJsDir + 'pc/**/*.js',
                    '!' + srcJsDir + '_template/**/*.js'
                ]
            },
            test: {
                src: ['src/js/tests/unit/*.js']
            }
        },
        browserify: {
            h5: {
                expand: true,
                cwd: 'src',
                options: {
                    debug: false,
                    alias: [
                        './src/h5/entry/edit:edit'
                    ],
                },
                src: [
                    './h5/entry/edit.js'
                ],
                dest: buildDir,
                ext: '.js'
            },
            pc: {
                expand: true,
                cwd: 'src',
                options: {
                    debug: false,
                },
                src: [
                    './pc/entry/entry.js'
                ],
                dest: buildDir,
                ext: '.js'
            },
            h5render_html: {
                expand: true,
                cwd: 'src',
                options: {
                    debug: false,
                    alias: [
                        './src/h5render/entry/entry:h5render_html'
                    ],
                },
                src: [
                    './h5render/entry/entry_html.js'
                ],
                dest: buildDir,
                ext: '.js'
            },
            h5render_rawjson: {
                expand: true,
                cwd: 'src',
                options: {
                    debug: false,
                    alias: [
                        './src/h5render/entry/entry_rawjson:h5render_rawjson'
                    ],
                },
                src: [
                    './h5render/entry/entry_rawjson.js'
                ],
                dest: buildDir,
                ext: '.js'
            },
            h5list: {
                expand: true,
                cwd: 'src',
                options: {
                    debug: false,
                    alias: [
                        './src/h5/entry/list:list'
                    ],
                },
                src: [
                    './h5/entry/list.js'
                ],
                dest: buildDir,
                ext: '.js'
            }
        },
        uglify: {
            production: {
                expand: true,
                cwd: buildDir,
                src: [
                    '**/*.js',
                    '!**/*.min.js'
                ],
                dest: buildDir,
                ext: '.min.js'
            },

        },
        less: {
            production: {
                expand: true,
                options: {
                    compress: true
                },
                cwd: srcLessDir,
                src: [
                    '**/entry.less',
                    'h5/entry/*.less'
                ],
                dest: buildDir,
                ext: '.min.css'
            },
            dev: {
                expand: true,
                cwd: srcLessDir,
                src: [
                    '**/entry.less',
                    'h5/entry/*.less'
                ],
                dest: buildDir,
                ext: '.css'
            },
            animate: {
                files: [{
                    src: "src/mod/animate/animate.less",
                    dest: "build/lib/css/animate.css"
                }]
            }

        },
        html2js: {
            default_options: {
                options: {
                   encoding:"utf8", //文件编码，默认为utf8
                   compress: true,  //是否压缩输出，默认为true,
                   type:'amd'   //amd输出,also support cmd
                },
                files: {
                    'src/_template/': 'src/**/*.tpl'
                }
            }
        },
        ejs: {
            dev: {
                cwd: 'src/',
                src: ['**/*.html', '!html-controls/**/*.html', '!build/**/*.html'],
                dest: buildDir,
                expand: true,
                ext: '.html'
            }
        },
        autoprefixer: { // https://github.com/nDmitry/grunt-autoprefixer
            options: {
                browsers: ['last 2 versions', 'bb 10']
            },
            no_dest: {
                src: 'build/lib/css/animate.css' // output file
            }
        },
        cssmin: {
            animate :{
                files: [{
                  src: "build/lib/css/animate.css",
                  dest: "build/lib/css/animate.min.css"
                }]
            }
        },

        watch: {
            options: {
                livereload: 3456
            },
            html2js: {
                files: [srcJsDir + '**/*.tpl'],
                tasks: ['html2js']
            },
            js: {
                files: [srcJsDir + '**/*.js'],
                tasks: ['browserify', 'jshint']
            },
            less: {
                files: [srcLessDir + '**/*.less'],
                tasks: ['less:dev']
            },
            html: {
                files: [ 'src/**/*.html'],
                tasks: ['ejs']
            }
        }
    });

    // Load plug-ins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ejs');
    grunt.loadNpmTasks('fdm-html2js');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    var concatAnim = function () {

        var categories = grunt.file.readJSON('anim-config.json'),
            category, files, file, fileArry = [];

        for(category in categories){
            files = categories[category];
            for(file in files){
                if(files.hasOwnProperty(file) && files[file]){
                    fileArry.push("@import 'src/" + category + "/" + file + "';");
                }
            }
        }

        grunt.file.write('src/mod/animate/animate.less', fileArry.join(''));

        grunt.task.run('less:animate');
        grunt.task.run('clean-Animate');
    };

    var cleanAnimateTmp = function(){
        grunt.file.delete('src/mod/animate/animate.less');
    };

    grunt.registerTask('cancat-Animate','concat animate less',concatAnim);
    grunt.registerTask('clean-Animate', 'clean animate less tmp', cleanAnimateTmp);
    grunt.registerTask('animate', ['cancat-Animate', 'autoprefixer', 'cssmin:animate']);


    // define tasks
    grunt.registerTask('default', [
        'jshint',
        'html2js',
        'browserify',
        // 'uglify',
        'less:dev',
        'ejs'
    ]);

    // define tasks
    grunt.registerTask('release', [
        'jshint',
        'html2js',
        'browserify',
        'uglify',
        'less:production',
        'ejs'
    ]);


};
