'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';

interface VoiceRecorderProps {
    onTranscript: (text: string) => void;
    disabled?: boolean;
}

export default function VoiceRecorder({ onTranscript, disabled }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            setIsSupported(!!SpeechRecognition);

            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'tr-TR'; // Turkish by default

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    onTranscript(transcript);
                    setIsRecording(false);
                };

                recognition.onerror = (event: any) => {
                    // Ignore "network" or "aborted" errors which are common
                    if (event.error === 'network' || event.error === 'aborted') {
                        console.warn('Speech recognition network/abort error (ignoring):', event.error);
                    } else {
                        console.error('Speech recognition error:', event.error);
                    }
                    setIsRecording(false);
                };

                recognition.onend = () => {
                    setIsRecording(false);
                };

                recognitionRef.current = recognition;
            }
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
        };
    }, [onTranscript]);

    const toggleRecording = () => {
        if (!recognitionRef.current) return;

        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    if (!isSupported) {
        return null; // Hide if not supported
    }

    return (
        <button
            type="button"
            onClick={toggleRecording}
            disabled={disabled}
            className={`p-2.5 rounded-full transition-all duration-200 ${isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={isRecording ? 'Stop recording' : 'Record voice message'}
        >
            {isRecording ? (
                <MicOff className="w-5 h-5" />
            ) : (
                <Mic className="w-5 h-5" />
            )}
        </button>
    );
}
