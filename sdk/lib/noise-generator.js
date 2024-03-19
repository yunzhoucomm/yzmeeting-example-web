/**
* A noise generator with a gain AudioParam.
*
* @class NoiseGenerator
* @extends AudioWorkletProcessor
*/
class NoiseGenerator extends AudioWorkletProcessor {
    static get parameterDescriptors() {
        return [{name: 'amplitude', defaultValue: 0.25, minValue: 0, maxValue: 1}];
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];

        
        if (!input) {
            return true;
        }
        
        const amplitude = parameters.amplitude;
        const isAmplitudeConstant = amplitude.length === 1;

        for (let channel = 0; channel < output.length; ++channel) {
            const outputChannel = output[channel];
            const inputChannel = input[channel];
            for (let i = 0; i < outputChannel.length; ++i) {
                // This loop can branch out based on AudioParam array length, but
                // here we took a simple approach for the demonstration purpose.
                outputChannel[i] = inputChannel[i] + 1 * (Math.random() - 0.5) *
                    (isAmplitudeConstant ? amplitude[0] : amplitude[i]);
                //outputChannel[i] = inputChannel[i];
            }
        }

        return true;
    }
}

registerProcessor('noise-generator', NoiseGenerator);
