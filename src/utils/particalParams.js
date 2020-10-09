const params = {
    particles: {
        number: {
            value: 20,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: '#003366',
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#003366',
            },
            polygon: {
                nb_sides: 6,
            },
        },
        opacity: {
            value: 0.25,
            random: true,
            anim: {
                enable: true,
                speed: 0.15984015984015984,
                opacity_min: 0.1,
                sync: false,
            },
        },
        size: {
            value: 20,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                size_min: 40,
                sync: false,
            },
        },
        line_linked: {
            enable: false,
            distance: 200,
            color: '#ffffff',
            opacity: 1,
            width: 2,
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
            },
        },
    },
    interactivity: {
        detect_on: 'window',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse',
            },
            onclick: {
                enable: false,
                mode: 'remove',
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
            remove: {
                particles_nb: 2,
            },
        },
    },
    retina_detect: true,
};
export default params
