import { KairosSocket } from "@/services/ws"

export interface ConnectionManagerConfig {
  transcription: string
  detection: string
  overlay: string
  remote: string
  sessionId: string
}

export interface ConnectionManager {
  transcription: KairosSocket
  detection: KairosSocket
  overlay: KairosSocket
  remote: KairosSocket
  connectAll(): void
  disconnectAll(): void
}

export function createConnectionManager(config: ConnectionManagerConfig): ConnectionManager {
  const transcription = new KairosSocket(config.transcription)
  const detection = new KairosSocket(config.detection)
  const overlay = new KairosSocket(
    `${config.overlay}${config.overlay.includes('?') ? '&' : '?'}session=${config.sessionId}`
  )
  const remote = new KairosSocket(`${config.remote}?session=${config.sessionId}`)

  return {
    transcription,
    detection,
    overlay,
    remote,
    connectAll() {
      // Connect always-on sockets. Transcription is on-demand (needs API key).
      detection.connect()
      overlay.connect()
      remote.connect()
    },
    disconnectAll() {
      transcription.disconnect()
      detection.disconnect()
      overlay.disconnect()
      remote.disconnect()
    },
  }
}
