#ifdef GL_ES
precision mediump float;
#endif

#include "lygia/generative/fbm.glsl"
#include "lygia/generative/snoise.glsl"

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;
    vec4 col = vec4(vec3(0.), 1.);

    float speed = .1;
    float offset = iTime * speed;
    vec2 sNoiseUV = vec2(snoise((uv * 3.) + offset), uv.y);
    vec3 colSNoise = vec3(0.);

    colSNoise.r = fbm(sNoiseUV * .333 + offset);
    colSNoise.g = fbm(sNoiseUV * .666 + offset);
    colSNoise.b = fbm(sNoiseUV * .999 + offset);
    col.rgb = colSNoise;

    sNoiseUV = vec2(snoise((uv * 3.) + offset * 2.), uv.y);
    colSNoise.r = fbm(sNoiseUV.yx * .999 + offset);
    colSNoise.g = fbm(sNoiseUV.yx * .666 + offset);
    colSNoise.b = fbm(sNoiseUV.yx * .333 + offset);

    col.rgb = mix(col.rgb, colSNoise, 0.5) * 1.3;

    fragColor = col;
}
