interface Vec2 {
    x: number;
    y: number;
}

function Vec2(x: number, y: number): Vec2 {
    return { x, y };
}

interface Triangle {
    a: Vec2,
    b: Vec2,
    c: Vec2,
    color: string,
    colorHex: number[],
}

interface BezierCurve {
    controlPoints: Array<Vec2>;
}

function isPointInsideTriangle(p: Vec2, a: Vec2, b: Vec2, c: Vec2): boolean {
    // Calculate barycentric coordinates
    const denominator = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
    const alpha = ((b.y - c.y) * (p.x - c.x) + (c.x - b.x) * (p.y - c.y)) / denominator;
    const beta = ((c.y - a.y) * (p.x - c.x) + (a.x - c.x) * (p.y - c.y)) / denominator;
    const gamma = 1 - alpha - beta;

    // Check if point is inside the triangle
    return 0 <= alpha && alpha <= 1 && 0 <= beta && beta <= 1 && 0 <= gamma && gamma <= 1;
}

function mixColorChannel(colorChannelA: number, colorChannelB: number, amountToMix: number){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return channelA + channelB;
}

function mixRgb(rgbA: number[], rgbB: number[], amountToMix: number){
    var r = mixColorChannel(rgbA[0],rgbB[0],amountToMix);
    var g = mixColorChannel(rgbA[1],rgbB[1],amountToMix);
    var b = mixColorChannel(rgbA[2],rgbB[2],amountToMix);
    return `rgb(${r}, ${g}, ${b})`
}

interface Vec2 {
    x: number;
    y: number;
}

export class CanvasRenderer {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    
    scale: number;
    pixelPreview: boolean;
    ssaa: number = 128;

    offset: Vec2;
    dragging: boolean;

    constructor(c: HTMLCanvasElement) {
        this.canvas = c;
        // @ts-ignore
        this.context = this.canvas.getContext('2d');

        // flags
        this.scale = 1;
        this.pixelPreview = false;
        this.offset = Vec2(300, 300);
        this.dragging = false;

        this.canvas.addEventListener('mousedown', e => {
            if (e.button === 1) this.dragging = true;
        });

        window.addEventListener('mouseup', e => {
            this.dragging = false;
        });

        window.addEventListener('mousemove', e => {
            if (this.dragging) {
                this.offset.x += e.movementX;
                this.offset.y += e.movementY;
                this.draw();
            }        
        });
        
        window.addEventListener('resize', this.draw);
        this.draw();
    }

    setScale(v: number) {
        this.scale = v;
        this.draw();
    }

    setPixelPreview(v: boolean) {
        this.pixelPreview = v;
        this.draw();
    } 

    drawTriangle(t: Triangle, color: string, colorHex: number[]) {
        if (!this.pixelPreview) {
            t.a.x *= this.scale;
            t.a.y *= this.scale;
            t.b.x *= this.scale;
            t.b.y *= this.scale;
            t.c.x *= this.scale;
            t.c.y *= this.scale;

            this.context.fillStyle = color;
            this.context.beginPath();
            this.context.moveTo(t.a.x + this.offset.x, t.a.y + this.offset.y);
            this.context.lineTo(t.b.x + this.offset.x, t.b.y + this.offset.y);
            this.context.lineTo(t.c.x + this.offset.x, t.c.y + this.offset.y);
            this.context.fill();
        } else {
            let min_x = Math.min(t.a.x, Math.min(t.b.x, t.c.x));
            let min_y = Math.min(t.a.y, Math.min(t.b.y, t.c.y));
            let max_x = Math.max(t.a.x, Math.max(t.b.x, t.c.x));
            let max_y = Math.max(t.a.y, Math.max(t.b.y, t.c.y));
    
            let width = max_x - min_x;
            let height = max_y - min_y;
            let top = min_y;
            let left = min_x;
    
            const side = Math.sqrt(this.ssaa);
    
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let pixelsInTriangle = 0;
                    let p = Vec2(x + left, y + top);

                    for (let ix = 0; ix < side; ix++) {
                        for (let iy = 0; iy < side; iy++) {
                            let p = Vec2(
                                ((x + left) * side) + ix, 
                                ((y + top) * side) + iy,
                            );

                            if (isPointInsideTriangle(p, { x: t.a.x * side, y: t.a.y * side }, { x: t.b.x * side, y: t.b.y * side }, { x: t.c.x * side, y: t.c.y * side })) {
                                pixelsInTriangle += 1;
                            }
                        }
                    }

                    if (pixelsInTriangle > 0) {
                        const pointCenterLocation = {
                            x: (p.x * this.scale) + (this.scale / 2) + this.offset.x, 
                            y: (p.y * this.scale) + (this.scale / 2) + this.offset.y,
                        }
                        const point = this.context.getImageData(pointCenterLocation.x, pointCenterLocation.y, 1, 1).data;

                        this.context.fillStyle = mixRgb(colorHex, [point[0], point[1], point[2]], pixelsInTriangle/this.ssaa);
                        this.context.fillRect(
                            Math.ceil(p.x * this.scale + this.offset.x), 
                            Math.ceil(p.y * this.scale + this.offset.y), 
                            Math.ceil(this.scale), 
                            Math.ceil(this.scale),
                        );
                    }
                }
            }
        }
    }

    drawCurve(curve: BezierCurve) {
        const minX = Math.min(...curve.controlPoints.map(p => p.x));
        const maxX = Math.max(...curve.controlPoints.map(p => p.x));
        const minY = Math.min(...curve.controlPoints.map(p => p.y));
        const maxY = Math.max(...curve.controlPoints.map(p => p.y));
        let top = minX;
        let left = minY;
        let width = maxX - left;
        let height = maxY - top;

        for (let i = 0; i < curve.controlPoints.length; i++) {
            curve.controlPoints[i].x *= this.scale;
            curve.controlPoints[i].y *= this.scale;
        }

        this.context.fillStyle = "#ededed";

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let p = Vec2(x + left, y + top);
                
                // TODO
            }
        }
    }

    draw() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 48;
        
        this.context.fillStyle = "#1C1C1C";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const triangles: Array<Triangle> = [
            {
                a: Vec2(0, 0),
                b: Vec2(16, 13),
                c: Vec2(0, 16),
                color: "#FF0000",
                colorHex: [255, 0, 0],
            },
            {
                a: Vec2(17, 0),
                b: Vec2(1, 13),
                c: Vec2(17, 16),
                color: "#00FF00",
                colorHex: [0, 255, 0],
            },
        ];

        // const curves: Array<BezierCurve> = [
        //     {
        //         controlPoints: [{ x: 0, y: 100 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 100, y: 0 }],
        //     },
        // ];

        for (const triangle of triangles)
            this.drawTriangle(triangle, triangle.color, triangle.colorHex);

        // for (const curve of curves) 
        //    this.drawCurve(curve);

        // draw gridlines if its zoomed enough
        if (this.scale > 8) {
            const order = this.getFrameBufferOrder();
            
            this.context.fillStyle = "rgba(255, 255, 255, 0.15)";

            const gridlineOffset = {
                x: this.offset.x % this.scale,
                y: this.offset.y % this.scale,
            };

            for (let x = 0; x < order.x; x++) {
                this.context.fillRect(Math.ceil(x * this.scale + gridlineOffset.x), 0, 1, this.canvas.height);
            } 
            
            for (let y = 0; y < order.y; y++) {
                this.context.fillRect(0, (Math.ceil(y * this.scale + gridlineOffset.y)), this.canvas.width, 1);
            }
        }
    }

    getFrameBufferOrder(): Vec2 {
        return {
            x: Math.ceil(this.canvas.width / this.scale), 
            y: Math.ceil(this.canvas.height / this.scale),
        };
    }
}