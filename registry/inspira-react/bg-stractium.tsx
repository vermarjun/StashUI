"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ShaderToy } from "@/registry/inspira-react/shader-toy";

const STRACTIUM_SHADER = `
// ShaderToy: https://www.shadertoy.com/view/Mlf3R4

const int NUM_SIN_REPS = 9;
const int MAX_MARCH_REPS = 250;
const float MARCH_DISTANCE_MULTIPLIER = 0.1;

float localTime = 0.0;

float Hash(float f) { return fract(cos(f)*7561.0); }
float Hash2d(vec2 uv) {
    float f = uv.x + uv.y * 521.0;
    return fract(cos(f)*104729.0);
}
vec2 Hash2(vec2 v) { return fract(cos(v*3.333)*vec2(100003.9, 37049.7)); }
float Hash3d(vec3 uv) {
    float f = uv.x + uv.y * 37.0 + uv.z * 521.0;
    return fract(sin(f)*110003.9);
}

float mixP(float f0, float f1, float a) { return mix(f0, f1, a*a*(3.0-2.0*a)); }
vec2 mixP2(vec2 v0, vec2 v1, float a) { return mix(v0, v1, a*a*(3.0-2.0*a)); }
float mixC(float f0, float f1, float a) { return mix(f1, f0, cos(a*3.1415926)*0.5+0.5); }

const vec2 zeroOne = vec2(0.0, 1.0);

float noise2d(vec2 uv) {
    vec2 fr = fract(uv); vec2 fl = floor(uv);
    float h00=Hash2d(fl), h10=Hash2d(fl+zeroOne.yx), h01=Hash2d(fl+zeroOne), h11=Hash2d(fl+zeroOne.yy);
    return mixP(mixP(h00,h10,fr.x), mixP(h01,h11,fr.x), fr.y);
}
float noise(vec3 uv) {
    vec3 fr=fract(uv.xyz); vec3 fl=floor(uv.xyz);
    float h000=Hash3d(fl), h100=Hash3d(fl+zeroOne.yxx), h010=Hash3d(fl+zeroOne.xyx), h110=Hash3d(fl+zeroOne.yyx);
    float h001=Hash3d(fl+zeroOne.xxy), h101=Hash3d(fl+zeroOne.yxy), h011=Hash3d(fl+zeroOne.xyy), h111=Hash3d(fl+zeroOne.yyy);
    return mixP(mixP(mixP(h000,h100,fr.x),mixP(h010,h110,fr.x),fr.y), mixP(mixP(h001,h101,fr.x),mixP(h011,h111,fr.x),fr.y), fr.z);
}

float PI=3.14159265;
vec3 saturate3(vec3 a) { return clamp(a, 0.0, 1.0); }
float saturate1(float a) { return clamp(a, 0.0, 1.0); }

vec3 RotateX(vec3 v, float rad) {
    float c=cos(rad), s=sin(rad);
    return vec3(v.x, c*v.y+s*v.z, -s*v.y+c*v.z);
}
vec3 RotateY(vec3 v, float rad) {
    float c=cos(rad), s=sin(rad);
    return vec3(c*v.x-s*v.z, v.y, s*v.x+c*v.z);
}
vec3 RotateZ(vec3 v, float rad) {
    float c=cos(rad), s=sin(rad);
    return vec3(c*v.x+s*v.y, -s*v.x+c*v.y, v.z);
}

vec3 sunCol = vec3(258.0,228.0,170.0)/3555.0;
vec3 GetSunColorReflection(vec3 rayDir, vec3 sunDir) {
    float dist=1.0-(dot(normalize(rayDir),sunDir)*0.5+0.5);
    float si=0.015/dist; si=pow(si,0.3)*100.0;
    si+=exp(-dist*12.0)*300.0; si=min(si,40000.0);
    return sunCol*si*0.0425;
}
vec3 GetSunColorSmall(vec3 rayDir, vec3 sunDir) {
    float dist=1.0-(dot(normalize(rayDir),sunDir)*0.5+0.5);
    float si=0.05/dist; si+=exp(-dist*12.0)*300.0; si=min(si,40000.0);
    return sunCol*si*0.025;
}

vec3 camPos=vec3(0.0), camFacing;
vec3 camLookat=vec3(0,0.0,0);

float SinRep(float a) {
    float h=0.0, mult=1.0;
    for (int i=0; i<NUM_SIN_REPS; i++) { h+=(cos(a*mult)/(mult)); mult*=2.0; }
    return h;
}

vec2 DistanceToObject(vec3 p) {
    float material=0.0, h=0.0;
    p=RotateY(p, p.y*0.4-cos(localTime)*0.4);
    h+=SinRep(RotateY(p,p.z*3.14*0.25).x);
    h+=SinRep(RotateZ(p,p.x*3.14*0.25).y);
    h+=SinRep(RotateX(p,p.y*3.14*0.25).z);
    material=h;
    float final=(length(p)-4.0-h*(0.25+sin(localTime)*0.35));
    return vec2(final,material);
}

float distFromSphere;
float IntersectSphereAndRay(vec3 pos, float radius, vec3 posA, vec3 posB, out vec3 iA2, out vec3 iB2) {
    vec3 eyeVec2=normalize(posB-posA);
    float dp=dot(eyeVec2,pos-posA);
    vec3 pol=eyeVec2*dp+posA;
    float distance=length(pol-pos);
    float ac=radius*radius-distance*distance;
    float rightLen=0.0;
    if (ac>=0.0) rightLen=sqrt(ac);
    iA2=pol-eyeVec2*rightLen;
    iB2=pol+eyeVec2*rightLen;
    distFromSphere=distance-radius;
    if (distance<=radius) return 1.0;
    return 0.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    localTime = iTime*iSpeed - 1.6;
    vec2 uv = fragCoord.xy/iResolution.xy*2.0-1.0;
    vec3 camUp=vec3(0,1,0);
    camLookat=vec3(0,0.0,0);
    float mx=iMouse.x/iResolution.x*PI*2.0-0.7+localTime*0.123;
    float my=-iMouse.y/iResolution.y*10.0-sin(localTime*0.31)*0.5;
    camPos+=vec3(cos(my)*cos(mx),sin(my),cos(my)*sin(mx))*9.2;
    vec3 camVec=normalize(camLookat-camPos);
    vec3 sideNorm=normalize(cross(camUp,camVec));
    vec3 upNorm=cross(camVec,sideNorm);
    vec3 worldFacing=camPos+camVec;
    vec3 worldPix=worldFacing+uv.x*sideNorm*(iResolution.x/iResolution.y)+uv.y*upNorm;
    vec3 relVec=normalize(worldPix-camPos);

    vec3 iA, iB;
    float hit=IntersectSphereAndRay(vec3(0,0,0),7.6,camPos,camPos+relVec,iA,iB);

    vec2 distAndMat=vec2(0.05,0.0);
    float t=0.0, maxDepth=110.0;
    vec3 pos=vec3(0,0,0);
    camPos=iA; maxDepth=distance(iA,iB);

    if (hit>0.5) {
        for (int i=0; i<MAX_MARCH_REPS; i++) {
            if ((t>maxDepth)||(abs(distAndMat.x)<0.0075)) break;
            pos=camPos+relVec*t;
            distAndMat=DistanceToObject(pos);
            t+=distAndMat.x*MARCH_DISTANCE_MULTIPLIER;
        }
    } else { t=maxDepth+1.0; distAndMat.x=1.0; }

    vec3 sunDir=normalize(vec3(0.93,1.0,-1.5));
    vec3 finalColor=vec3(0.0);

    if (abs(distAndMat.x)<0.75) {
        vec3 smallVec=vec3(0.005,0,0);
        vec3 normalU=vec3(distAndMat.x-DistanceToObject(pos-smallVec.xyy).x,
                          distAndMat.x-DistanceToObject(pos-smallVec.yxy).x,
                          distAndMat.x-DistanceToObject(pos-smallVec.yyx).x);
        vec3 normal=normalize(normalU);

        float ambientS=1.0;
        ambientS*=saturate1(DistanceToObject(pos+normal*0.1).x*10.0);
        ambientS*=saturate1(DistanceToObject(pos+normal*0.2).x*5.0);
        ambientS*=saturate1(DistanceToObject(pos+normal*0.4).x*2.5);
        ambientS*=saturate1(DistanceToObject(pos+normal*0.8).x*1.25);
        float ambient=ambientS*saturate1(DistanceToObject(pos+normal*1.6).x*1.25*0.5);
        ambient*=saturate1(DistanceToObject(pos+normal*3.2).x*1.25*0.25);
        ambient*=saturate1(DistanceToObject(pos+normal*6.4).x*1.25*0.125);
        ambient=max(0.15,pow(ambient,0.3)); ambient=saturate1(ambient);

        float sunShadow=1.0, iter=0.2;
        for (int i=0; i<10; i++) {
            float tempDist=DistanceToObject(pos+sunDir*iter).x;
            sunShadow*=saturate1(tempDist*10.0);
            if (tempDist<=0.0) break;
            iter*=1.5;
        }
        sunShadow=saturate1(sunShadow);
        vec3 ref=reflect(relVec,normal);

        vec3 rp=RotateY(pos,pos.y*0.4-cos(localTime)*0.4);
        float n=noise(rp*4.0)+noise(rp*8.0)+noise(rp*16.0)+noise(rp*32.0);
        n=saturate1(n*0.25*0.95+0.05);
        vec3 texColor=vec3(0.2,0.3,0.3)*n;
        texColor+=vec3(0.99,0.21,0.213)*clamp(length(pos)-4.0,0.0,0.4);
        texColor+=vec3(1.0,21.0,26.0)*0.6*saturate1(length(normalU)-0.01);
        texColor-=vec3(0.0,0.3,0.5)*saturate1(-distAndMat.y*(0.9+sin(localTime+0.5)*0.9));
        texColor=max(vec3(0.02),texColor);

        vec3 lightColor=sunCol*saturate1(dot(sunDir,normal))*sunShadow*14.0;
        lightColor+=vec3(0.1,0.35,0.95)*(normal.y*0.5+0.5)*ambient*0.25;
        lightColor+=vec3(1.0)*((-normal.y)*0.5+0.5)*ambient*0.2;
        finalColor=texColor*lightColor;
        finalColor+=GetSunColorReflection(ref,sunDir)*0.68*sunCol*sunShadow*9.0*texColor.g;
        finalColor=mix(vec3(0.98,0.981,0.981)+min(vec3(0.25),GetSunColorSmall(relVec,sunDir))*2.0, finalColor, exp(-t*0.007));
    } else {
        finalColor=mix(vec3(1.0,0.95,0.85),vec3(0.2,0.5,0.95),pow(saturate1(relVec.y),0.7))*0.95;
        finalColor+=GetSunColorSmall(relVec,sunDir);
    }

    finalColor*=vec3(1.0)*saturate1(1.0-length(uv/2.5));
    finalColor*=1.95;
    fragColor=vec4(sqrt(clamp(finalColor,0.0,1.0)),1.0);
}
`;

export interface BgStractiumProps {
  className?: string;
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
  mouseSensitivity?: number;
  damping?: number;
  noise?: { opacity: number; scale: number };
}

export function BgStractium({
  className,
  hue = 0,
  saturation = 1,
  brightness = 1,
  speed = 1,
  mouseSensitivity = 0.5,
  damping = 1,
  noise,
}: BgStractiumProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <ShaderToy
        shaderCode={STRACTIUM_SHADER}
        hue={hue}
        saturation={saturation}
        brightness={brightness}
        speed={speed}
        mouseSensitivity={mouseSensitivity}
        damping={damping}
        noise={noise}
      />
    </div>
  );
}
