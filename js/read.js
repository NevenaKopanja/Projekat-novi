function read() {
    if (!i) {
        document.getElementById("more1").style.
            display = "inline";
        document.getElementById("dots1").style.
            display = "none";
        document.getElementById("read1").innerHTML = "Read less";
        i = 1;
    }
    else {
        document.getElementById("more1").style.
            display = "none";
        document.getElementById("dots1").style.
            display = "none";
        document.getElementById("read1").innerHTML = "Read more";
        i = 0;
    }
}
