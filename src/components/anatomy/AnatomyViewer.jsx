import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {
  createProceduralMitochondria,
  createProceduralHeart,
  createProceduralBrain,
} from './proceduralModels'

export default function AnatomyViewer({
  initialSpecimen = 'mitochondria',
  customModelUrl = null,
}) {
  const containerRef = useRef(null)
  const [specimen, setSpecimen] = useState(initialSpecimen)
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isFallback, setIsFallback] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [autoRotate, setAutoRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null)

  // Referensi internal untuk interaksi tombol eksternal
  const controlsRef = useRef(null)
  const cameraRef = useRef(null)
  const currentModelRef = useRef(null)

  // Reset kamera ke posisi awal
  const handleResetCamera = useCallback(() => {
    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.reset()
      cameraRef.current.position.set(0, 1.2, 5.0)
      controlsRef.current.target.set(0, 0, 0)
      controlsRef.current.update()
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let animationFrameId = null
    const clock = new THREE.Clock()

    // 1. Inisialisasi Renderer WebGL dengan pembatasan Pixel Ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 2. Inisialisasi Scene & Kamera Perspektif
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 1.2, 5.0)
    cameraRef.current = camera

    // 3. OrbitControls Interaktif (rotasi, zoom, pan terbatas)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 1.5
    controls.maxDistance = 15.0
    controls.minPolarAngle = 0.1
    controls.maxPolarAngle = Math.PI * 0.95
    controls.enablePan = true
    controls.autoRotate = autoRotate
    controls.autoRotateSpeed = 1.2
    controlsRef.current = controls

    // 4. Pencahayaan Standar (Ambient + Directional + Hemisphere)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xfffaf4, 1.8)
    keyLight.position.set(-3, 6, 4)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 1.0)
    rimLight.position.set(3, 2, -4)
    scene.add(rimLight)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x334155, 0.7)
    scene.add(hemiLight)

    // Platform / Grid Reflektif Minimalis
    const gridHelper = new THREE.GridHelper(10, 20, 0x0d5c46, 0xe2e8f0)
    gridHelper.position.y = -2.2
    scene.add(gridHelper)

    // Raycaster untuk interaksi hover & klik pada struktur organ
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // 5. Inisialisasi GLTFLoader & DRACOLoader
    const dracoLoader = new DRACOLoader()
    const baseUrl = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    dracoLoader.setDecoderPath(`${baseUrl}draco/gltf/`)

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    // Helper: Me-render model prosedural
    const mountProceduralModel = (specimenKey) => {
      setIsFallback(true)
      let model
      if (specimenKey === 'heart') {
        model = createProceduralHeart()
        setStatusMessage('Mode Prosedural: Menampilkan simulasi Jantung Manusia (Kardiovaskular)')
      } else if (specimenKey === 'brain') {
        model = createProceduralBrain()
        setStatusMessage('Mode Prosedural: Menampilkan simulasi Otak & Sistem Saraf Manusia')
      } else {
        model = createProceduralMitochondria()
        setStatusMessage('Mode Prosedural: Menampilkan model Organel Mitokondria (Biologi Sel)')
      }

      currentModelRef.current = model
      scene.add(model)
      setIsLoading(false)
      setLoadProgress(100)
    }

    // 6. Muat Model (Percobaan GLTF eksternal dengan fallback otomatis)
    const loadModel = () => {
      setIsLoading(true)
      setLoadProgress(0)

      // Jika URL berkas 3D eksternal disediakan
      if (customModelUrl) {
        gltfLoader.load(
          customModelUrl,
          (gltf) => {
            if (disposed) return
            const root = gltf.scene || gltf.scenes[0]
            root.scale.set(1.5, 1.5, 1.5)
            currentModelRef.current = root
            scene.add(root)
            setIsLoading(false)
            setIsFallback(false)
            setStatusMessage('Model GLTF Eksternal berhasil dimuat.')
          },
          (xhr) => {
            if (xhr.total > 0) {
              const percent = Math.round((xhr.loaded / xhr.total) * 100)
              setLoadProgress(percent)
            }
          },
          (error) => {
            console.warn('GLTFLoader gagal memuat file eksternal. Mengaktifkan fallback prosedural.', error)
            mountProceduralModel(specimen)
          }
        )
      } else {
        // Secara default aktifkan model prosedural yang dirancang kaya detail
        mountProceduralModel(specimen)
      }
    }

    loadModel()

    // 7. Event Handler Resize Responsif
    const handleResize = () => {
      if (!container || disposed) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // Raycast click
    const handlePointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      if (currentModelRef.current) {
        const intersects = raycaster.intersectObjects(currentModelRef.current.children, true)
        if (intersects.length > 0) {
          const hit = intersects[0].object
          setSelectedPart(hit.name || 'Struktur Anatomi')
        }
      }
    }

    renderer.domElement.addEventListener('pointerdown', handlePointerDown)

    // 8. Render Loop & Animasi Halus
    const animate = () => {
      if (disposed) return
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()
      controls.update()

      // Efek animasi detak/pulsasi biologis lembut untuk organ
      if (currentModelRef.current) {
        if (specimen === 'heart') {
          // Denyut jantung sistol-diastol (kontraksi cepat, relaksasi berirama)
          const pulse = 1 + 0.05 * Math.pow(Math.sin(elapsedTime * 4.5), 3)
          currentModelRef.current.scale.set(pulse, pulse, pulse)
        } else if (specimen === 'mitochondria') {
          // Osilasi membran sel
          const gentleBreath = 1 + 0.015 * Math.sin(elapsedTime * 2.0)
          currentModelRef.current.scale.set(gentleBreath, gentleBreath, gentleBreath)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // 9. Pembersihan Memori Agresif (Disposal Lifecycle saat unmount)
    return () => {
      disposed = true

      // Hentikan requestAnimationFrame
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }

      // Lepas event listener
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown)

      // Pelepasan kontrol & loader
      controls.dispose()
      dracoLoader.dispose()

      // Traverse dan bersihkan seluruh geometri, material, dan tekstur di scene
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose()
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => {
              if (mat.map) mat.map.dispose()
              if (mat.normalMap) mat.normalMap.dispose()
              if (mat.roughnessMap) mat.roughnessMap.dispose()
              mat.dispose()
            })
          } else {
            if (object.material.map) object.material.map.dispose()
            if (object.material.normalMap) object.material.normalMap.dispose()
            if (object.material.roughnessMap) object.material.roughnessMap.dispose()
            object.material.dispose()
          }
        }
      })

      // Hancurkan konteks WebGL dan renderer
      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [specimen, customModelUrl])

  // Sinkronisasi kontrol autoRotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate
    }
  }, [autoRotate])

  // Sinkronisasi mode Wireframe
  useEffect(() => {
    if (currentModelRef.current) {
      currentModelRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => (m.wireframe = wireframe))
          } else {
            child.material.wireframe = wireframe
          }
        }
      })
    }
  }, [wireframe])

  return (
    <div className="anatomy-viewer-container" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '560px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', backgroundColor: '#f1f5f9', border: '1px solid rgba(191,201,194,0.4)', boxShadow: 'var(--shadow-level-1)' }}>
      {/* 3D Viewport Canvas Container */}
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />

      {/* Top Floating Controls & Specimen Selector */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none', zIndex: 10 }}>
        {/* Specimen Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(191,201,194,0.4)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <button
            type="button"
            onClick={() => setSpecimen('mitochondria')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: specimen === 'mitochondria' ? 'var(--color-primary-container)' : 'transparent',
              color: specimen === 'mitochondria' ? '#ffffff' : 'var(--color-on-surface)',
              transition: 'all 0.15s',
            }}
          >
            Mitokondria (Sel)
          </button>
          <button
            type="button"
            onClick={() => setSpecimen('heart')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: specimen === 'heart' ? 'var(--color-primary-container)' : 'transparent',
              color: specimen === 'heart' ? '#ffffff' : 'var(--color-on-surface)',
              transition: 'all 0.15s',
            }}
          >
            Jantung (Sirkulasi)
          </button>
          <button
            type="button"
            onClick={() => setSpecimen('brain')}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: specimen === 'brain' ? 'var(--color-primary-container)' : 'transparent',
              color: specimen === 'brain' ? '#ffffff' : 'var(--color-on-surface)',
              transition: 'all 0.15s',
            }}
          >
            Otak (Saraf)
          </button>
        </div>

        {/* Viewport Control Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', pointerEvents: 'auto' }}>
          <button
            type="button"
            onClick={() => setAutoRotate((prev) => !prev)}
            title="Toggle Auto Rotasi"
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(191,201,194,0.5)',
              backgroundColor: autoRotate ? 'var(--color-secondary-container)' : 'rgba(255,255,255,0.9)',
              color: autoRotate ? 'var(--color-primary)' : 'var(--color-on-surface)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {autoRotate ? 'sync' : 'sync_disabled'}
            </span>
            <span>{autoRotate ? 'Rotasi Aktif' : 'Rotasi Diam'}</span>
          </button>

          <button
            type="button"
            onClick={() => setWireframe((prev) => !prev)}
            title="Toggle Mode Rangka / Wireframe"
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(191,201,194,0.5)',
              backgroundColor: wireframe ? 'var(--color-primary-container)' : 'rgba(255,255,255,0.9)',
              color: wireframe ? '#ffffff' : 'var(--color-on-surface)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>grid_view</span>
            <span>Wireframe</span>
          </button>

          <button
            type="button"
            onClick={handleResetCamera}
            title="Reset Sudut Pandang Kamera"
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(191,201,194,0.5)',
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'var(--color-on-surface)',
              fontWeight: 600,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>center_focus_strong</span>
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>

      {/* Loading Progress Indicator Overlay */}
      {isLoading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(248, 249, 255, 0.85)', backdropFilter: 'blur(6px)', zIndex: 30 }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', border: '4px solid #e2e8f0', borderTopColor: 'var(--color-primary-container)', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
            Memuat Model Anatomi 3D...
          </p>
          <div style={{ width: '12rem', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '9999px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${loadProgress}%`, height: '100%', backgroundColor: 'var(--color-primary-container)', transition: 'width 0.2s' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', marginTop: '0.35rem' }}>
            {loadProgress}% terunduh
          </span>
        </div>
      )}

      {/* Fallback & Status Badge at Bottom Left */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '0.35rem', maxWidth: '28rem', pointerEvents: 'none' }}>
        {isFallback && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-full)', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '0.75rem', fontWeight: 600, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', pointerEvents: 'auto' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#059669' }}>offline_bolt</span>
            <span>Mode Standalone / Prosedural (Fallback)</span>
          </div>
        )}
        <div style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', border: '1px solid rgba(191,201,194,0.4)', fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
          {statusMessage}
        </div>
      </div>

      {/* Selected Part Badge at Bottom Right */}
      {selectedPart && (
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 10, padding: '0.5rem 1rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-inverse-surface)', color: 'var(--color-inverse-on-surface)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-primary-fixed-dim)' }}>touch_app</span>
          <span>Bagian Terpilih: <strong>{selectedPart}</strong></span>
        </div>
      )}
    </div>
  )
}
