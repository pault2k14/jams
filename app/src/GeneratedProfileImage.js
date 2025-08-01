import {
    FaA,
    FaB,
    FaC,
    FaD,
    FaE,
    FaF,
    FaG,
    FaH,
    FaI,
    FaJ,
    FaK,
    FaL,
    FaM,
    FaN,
    FaO,
    FaP,
    FaQ,
    FaR, FaS, FaT, FaU, FaV, FaW, FaX, FaY, FaZ
} from "react-icons/fa6";
import {FaQuestion} from "react-icons/fa";
import React from "react";

const GeneratedProfileImage = ({username, size, borderRadius, color, backgroundColor}) => {
    const lowerCaseUsername = username.toLowerCase();
    const firstLetterOfUsername = lowerCaseUsername.charAt(0);
    let icon = null

    switch(firstLetterOfUsername) {
        case 'a':
            icon = <FaA size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'b':
            icon = <FaB size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'c':
            icon = <FaC size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'd':
            icon = <FaD size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'e':
            icon = <FaE size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'f':
            icon = <FaF size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'g':
            icon = <FaG size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'h':
            icon = <FaH size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'i':
            icon = <FaI size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'j':
            icon = <FaJ size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'k':
            icon = <FaK size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'l':
            icon = <FaL size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'm':
            icon = <FaM size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'n':
            icon = <FaN size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'o':
            icon = <FaO size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'p':
            icon = <FaP size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'q':
            icon = <FaQ size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'r':
            icon = <FaR size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 's':
            icon =  <FaS size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 't':
            icon = <FaT size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'u':
            icon = <FaU size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'v':
            icon = <FaV size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'w':
            icon = <FaW size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'x':
            icon = <FaX size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'y':
            icon = <FaY size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        case 'z':
            icon = <FaZ size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
            break;
        default:
            icon = <FaQuestion size={size} style={{
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: borderRadius
            }}/>
    }

    return (
        <span>{icon}</span>
    )

}

export default GeneratedProfileImage;
