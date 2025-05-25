const https = require('https');
const fs = require('fs');
const path = require('path');

const libraries = [
    {
        name: 'scrollreveal.min.js',
        url: 'https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js'
    },
    {
        name: 'matter.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js'
    },
    {
        name: 'particles.min.js',
        url: 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
    },
    {
        name: 'typed.min.js',
        url: 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12/lib/typed.min.js'
    },
    {
        name: 'chart.min.js',
        url: 'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js'
    },
    {
        name: 'aos.js',
        url: 'https://unpkg.com/aos@2.3.1/dist/aos.js'
    },
    {
        name: 'aos.css',
        url: 'https://unpkg.com/aos@2.3.1/dist/aos.css'
    },
    {
        name: 'gsap.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'
    },
    {
        name: 'ScrollTrigger.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
    },
    {
        name: 'three.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.159.0/three.min.js'
    },
    {
        name: 'swiper-bundle.min.js',
        url: 'https://cdn.jsdelivr.net/npm/swiper@8.4.7/swiper-bundle.min.js'
    },
    {
        name: 'swiper-bundle.min.css',
        url: 'https://cdn.jsdelivr.net/npm/swiper@8.4.7/swiper-bundle.min.css'
    },
    {
        name: 'highlight.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js'
    },
    {
        name: 'highlight.min.css',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css'
    },
    {
        name: 'countUp.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.umd.min.js'
    },
    {
        name: 'vanilla-tilt.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js'
    },
    {
        name: 'isotope.pkgd.min.js',
        url: 'https://unpkg.com/isotope-layout@3.0.6/dist/isotope.pkgd.min.js'
    },
    {
        name: 'lightbox.min.js',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox.min.js'
    },
    {
        name: 'lightbox.min.css',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css'
    }
];

// Create lib directory if it doesn't exist
if (!fs.existsSync('lib')) {
    fs.mkdirSync('lib');
}

// Download function
function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join('lib', filename));
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join('lib', filename));
            reject(err);
        });
    });
}

// Download all libraries
async function downloadAll() {
    for (const lib of libraries) {
        try {
            await downloadFile(lib.url, lib.name);
        } catch (error) {
            console.error(`Error downloading ${lib.name}:`, error);
        }
    }
}

downloadAll().then(() => {
    console.log('All libraries downloaded successfully!');
}).catch(error => {
    console.error('Error downloading libraries:', error);
}); 