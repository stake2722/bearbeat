function dsp (m: number) {
    for (let bb = 0; bb <= 3; bb++) {
        if (ins0[m * 4 + bb] == 1) {
            led.plot(bb + 1, 0)
        } else {
            led.unplot(bb + 1, 0)
        }
        if (ins1[m * 4 + bb] == 1) {
            led.plot(bb + 1, 1)
        } else {
            led.unplot(bb + 1, 1)
        }
        if (ins2[m * 4 + bb] == 1) {
            led.plot(bb + 1, 2)
        } else {
            led.unplot(bb + 1, 2)
        }
        if (ins3[m * 4 + bb] == 1) {
            led.plot(bb + 1, 3)
        } else {
            led.unplot(bb + 1, 3)
        }
    }
    for (let mm = 0; mm <= 3; mm++) {
        if (mm == m) {
            led.plot(0, mm)
        } else {
            led.unplot(0, mm)
        }
    }
    for (let bb2 = 0; bb2 <= 3; bb2++) {
        if (bb2 == beat) {
            led.plot(bb2 + 1, 4)
        } else {
            led.unplot(bb2 + 1, 4)
        }
    }
}
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        st = meas * 4 + pb
        if (pi == 0) {
            ins0[st] = 1 - ins0[st]
        } else {
            if (pi == 1) {
                ins1[st] = 1 - ins1[st]
            } else {
                if (pi == 2) {
                    ins2[st] = 1 - ins2[st]
                } else {
                    if (pi == 3) {
                        ins3[st] = 1 - ins3[st]
                    }
                }
            }
        }
    }
    dsp(meas)
})
input.onGesture(Gesture.Shake, function () {
    if (mode == 0) {
        Init0()
        dsp(meas)
        beat = 0
        meas = 0
    }
})
input.onButtonPressed(Button.AB, function () {
    if (mode == 0) {
        Init()
        beat = 0
        meas = 0
        dsp(meas)
    }
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        mode = 1
    } else {
        mode = 0
        beat = 0
        meas = 0
    }
})
function Init () {
    mode = 0
    ins0 = [
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    ins1 = [
    0,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    1,
    0,
    1,
    1,
    0,
    0,
    0
    ]
    ins2 = [
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    1,
    1,
    1
    ]
    ins3 = [
    1,
    0,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    1,
    0,
    1,
    1,
    0,
    0,
    0
    ]
}
function Init0 () {
    mode = 0
    ins0 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    ins1 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    ins2 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    ins3 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
}
let st = 0
let ins3: number[] = []
let ins2: number[] = []
let ins1: number[] = []
let ins0: number[] = []
let pb = 0
let pi = 0
let meas = 0
let beat = 0
let mode = 0
mode = 0
let sel = 0
Init()
beat = 0
meas = 0
pi = 0
pb = 0
dsp(meas)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P8) == 1) {
        pb += 1
        if (pb == 4) {
            meas += 1
            if (meas == 4) {
                meas = 0
            }
            pb = 0
        }
        while (pins.digitalReadPin(DigitalPin.P8) == 1) {
        	
        }
    }
    if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        pb += -1
        if (pb == -1) {
            meas += -1
            if (meas == -1) {
                meas = 3
            }
            pb = 3
        }
        while (pins.digitalReadPin(DigitalPin.P14) == 1) {
        	
        }
    }
    if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        pi += 1
        if (pi == 4) {
            pi = 0
        }
        while (pins.digitalReadPin(DigitalPin.P13) == 1) {
        	
        }
    }
    if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        pi += -1
        if (pi == -1) {
            pi = 3
        }
        while (pins.digitalReadPin(DigitalPin.P12) == 1) {
        	
        }
    }
    dsp(meas)
})
loops.everyInterval(250, function () {
    if (mode == 1) {
        if (beat == 4) {
            beat = 0
            meas += 1
            dsp(meas)
        }
        if (meas == 4) {
            meas = 0
            dsp(0)
        }
        led.plot(beat + 1, 4)
        if (ins0[meas * 4 + beat] == 1) {
            pins.digitalWritePin(DigitalPin.P15, 1)
        }
        if (ins1[meas * 4 + beat] == 1) {
            pins.digitalWritePin(DigitalPin.P1, 1)
        }
        if (ins2[meas * 4 + beat] == 1) {
            pins.digitalWritePin(DigitalPin.P16, 1)
        }
        if (ins3[meas * 4 + beat] == 1) {
            pins.digitalWritePin(DigitalPin.P2, 1)
        }
        basic.pause(10)
        led.unplot(beat + 1, 4)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        beat += 1
    } else {
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        if (pi == 0) {
            if (ins0[meas * 4 + pb] == 0) {
                led.plot(pb + 1, 0)
                basic.pause(30)
                led.unplot(pb + 1, 0)
            } else {
                led.unplot(pb + 1, 0)
                basic.pause(30)
                led.plot(pb + 1, 0)
            }
        } else {
            if (pi == 1) {
                if (ins1[meas * 4 + pb] == 0) {
                    led.plot(pb + 1, 1)
                    basic.pause(30)
                    led.unplot(pb + 1, 1)
                } else {
                    led.unplot(pb + 1, 0)
                    basic.pause(30)
                    led.plot(pb + 1, 1)
                }
            } else {
                if (pi == 2) {
                    if (ins1[meas * 4 + pb] == 0) {
                        led.plot(pb + 1, 2)
                        basic.pause(30)
                        led.unplot(pb + 1, 2)
                    } else {
                        led.unplot(pb + 1, 2)
                        basic.pause(30)
                        led.plot(pb + 1, 2)
                    }
                } else {
                    if (pi == 3) {
                        if (ins1[meas * 4 + pb] == 0) {
                            led.plot(pb + 1, 3)
                            basic.pause(30)
                            led.unplot(pb + 1, 3)
                        } else {
                            led.unplot(pb + 1, 3)
                            basic.pause(30)
                            led.plot(pb + 1, 3)
                        }
                    }
                }
            }
        }
    }
    dsp(meas)
})
