document.getElementById("conversionType").addEventListener("change", function() {
    let type = this.value;
    let baseSelectors = document.getElementById("fromBase");
    let toBaseSelectors = document.getElementById("toBase");

    if (type === "baseConversion") {
        baseSelectors.classList.remove("hide");
        toBaseSelectors.classList.remove("hide");
    } else {
        baseSelectors.classList.add("hide");
        toBaseSelectors.classList.add("hide");
    }
});

function convert() {
    let input = document.getElementById("inputValue").value.trim();
    let type = document.getElementById("conversionType").value;
    let result = "";

    if (!input) {
        document.getElementById("result").textContent = "Please enter a value.";
        return;
    }

    switch (type) {
        case "binaryToGray":
            result = binaryToGray(input);
            break;
        case "grayToBinary":
            result = grayToBinary(input);
            break;
        case "signedOneComplement":
            result = onesComplement(input);
            break;
        case "signedTwoComplement":
            result = twosComplement(input);
            break;
        case "baseConversion":
            let fromBase = parseInt(document.getElementById("fromBase").value);
            let toBase = parseInt(document.getElementById("toBase").value);
            result = baseConversion(input, fromBase, toBase);
            break;
        default:
            result = "Invalid selection";
    }

    document.getElementById("result").textContent = `Converted: ${result}`;
}

function binaryToGray(binary) {
    if (!/^[01]+$/.test(binary)) return "Invalid Binary Input";
    let gray = binary[0];
    for (let i = 1; i < binary.length; i++) {
        gray += (binary[i - 1] ^ binary[i]).toString();
    }
    return gray;
}

function grayToBinary(gray) {
    if (!/^[01]+$/.test(gray)) return "Invalid Gray Code Input";
    let binary = gray[0];
    for (let i = 1; i < gray.length; i++) {
        binary += (binary[i - 1] ^ gray[i]).toString();
    }
    return binary;
}

function onesComplement(binary) {
    if (!/^[01]+$/.test(binary)) return "Invalid Binary Input";
    return binary.split("").map(bit => bit === "0" ? "1" : "0").join("");
}

function twosComplement(binary) {
    if (!/^[01]+$/.test(binary)) return "Invalid Binary Input";
    let onesComp = onesComplement(binary);
    let carry = 1;
    let twosComp = "";

    for (let i = onesComp.length - 1; i >= 0; i--) {
        if (onesComp[i] === "1" && carry === 1) {
            twosComp = "0" + twosComp;
        } else if (onesComp[i] === "0" && carry === 1) {
            twosComp = "1" + twosComp;
            carry = 0;
        } else {
            twosComp = onesComp[i] + twosComp;
        }
    }
    return twosComp;
}

function baseConversion(value, fromBase, toBase) {
    let decimalValue = parseInt(value, fromBase);
    if (isNaN(decimalValue)) return "Invalid Input";
    return decimalValue.toString(toBase).toUpperCase();
}

function resetConverter() {
    document.getElementById("inputValue").value = "";
    document.getElementById("result").textContent = "---";
}

function copyResult() {
    let resultText = document.getElementById("result").textContent.replace("Converted: ", "");
    navigator.clipboard.writeText(resultText);
    alert("Result copied!");
}

function speakResult() {
    let resultText = document.getElementById("result").textContent.replace("Converted: ", "");
    let speech = new SpeechSynthesisUtterance(resultText);
    window.speechSynthesis.speak(speech);
}
