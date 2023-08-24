<script lang="jsx">
export default {
    props: {
        radius: {
            type: Number,
            default: 30,
        },
        rate: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        circleLength() {
            return Math.ceil(this.radius * 2 * Math.PI);
        },
        arcLength() {
            let progressLength = this.circleLength - (this.circleLength / 100) * this.rate;
            return `${progressLength}`;
        },
    },
    render() {
        return (
            <svg height="64" width="64" viewBox="0 0 70 70" x-mlns="http://www.w3.org/200/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color: #ff8969;" />
                        <stop offset="100%" style="stop-color: #ff7067" />
                    </linearGradient>
                </defs>
                <circle r="30" cx="35" cy="35" stroke="#f3f4f5" stroke-width="6" fill="none" />
                <circle
                    r="30"
                    cx="35"
                    cy="35"
                    stroke="url(#gradient)"
                    stroke-dashoffset={this.arcLength}
                    stroke-dasharray={this.circleLength}
                    transform="rotate(-90)"
                    transform-origin="center"
                    stroke-width="6"
                    fill="none"
                    stroke-linecap="round"
                />
                <text x="35" y="40" text-anchor="middle" fill="#333333">
                    <tspan style="font-size: 18px;font-weight: bold;">{this.rate}</tspan>
                    <tspan style="font-size: 12px">%</tspan>
                </text>
            </svg>
        );
    },
};
</script>
