const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
const colors = ['#FF4081', '#FFFFFF', '#FFC107', '#4CAF50', '#03A9F4'];

// Generate snowflakes
function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
    };
}

// Initialize snowflakes
for (let i = 0; i < 150; i++) {
    snowflakes.push(createSnowflake());
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw tree
    drawTree();

    // Draw snowflakes
    snowflakes.forEach((snowflake) => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
        ctx.fill();
    });
}

function updateSnowflakes() {
    snowflakes.forEach((snowflake) => {
        snowflake.y += snowflake.speed;
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    });
}

// Draw the Christmas tree
function drawTree() {
    const treeHeight = 300;
    const treeWidth = 150;
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 100;

    // Tree levels with glow
    for (let i = 0; i < 5; i++) {
        const levelHeight = treeHeight / 5;
        const levelWidth = treeWidth + i * 40;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - i * levelHeight - levelHeight / 2);
        ctx.lineTo(centerX - levelWidth / 2, centerY - i * levelHeight + levelHeight / 2);
        ctx.lineTo(centerX + levelWidth / 2, centerY - i * levelHeight + levelHeight / 2);
        ctx.closePath();
        ctx.fillStyle = '#3CB371';
        ctx.shadowColor = '#ADFF2F';
        ctx.shadowBlur = 20;
        ctx.fill();
    }

    // Trunk with shadow
    ctx.fillStyle = '#8B4513';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillRect(centerX - 20, centerY, 40, 60);

    // Decorations
    for (let i = 0; i < 50; i++) {
        const x = centerX + (Math.random() - 0.5) * treeWidth * 2;
        const y = centerY - Math.random() * treeHeight;
        const radius = Math.random() * 4 + 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 5;
        ctx.fill();
    }

    // Star on top
    drawStar(centerX, centerY - treeHeight, 15, '#FFD700');
}

function drawStar(cx, cy, radius, color) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(cx, cy);
    ctx.moveTo(0, -radius);

    for (let i = 0; i < 10; i++) {
        ctx.rotate(Math.PI / 5);
        ctx.lineTo(0, -(radius * (i % 2 === 0 ? 1 : 0.5)));
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
}

function animate() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animate);
}

animate();

// Adjust canvas size dynamically
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
