import * as THREE from 'three'

/**
 * Membuat model prosedural Organel Sel (Mitokondria)
 * Terdiri dari:
 * - Membran Luar (Outer Membrane) semi-transparan
 * - Membran Dalam berlekuk (Cristae)
 * - Matriks & Ribosom
 */
export function createProceduralMitochondria() {
  const group = new THREE.Group()
  group.name = 'ProceduralMitochondria'

  // 1. Membran Luar Kapsul (Outer Membrane)
  const outerGeom = new THREE.CapsuleGeometry(1.2, 2.4, 24, 48)
  const outerMat = new THREE.MeshStandardMaterial({
    color: 0x0d5c46, // Deep Emerald
    roughness: 0.35,
    metalness: 0.1,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    wireframe: false,
  })
  const outerMesh = new THREE.Mesh(outerGeom, outerMat)
  outerMesh.name = 'Membran Luar'
  group.add(outerMesh)

  // 2. Matriks Dalam (Inner Matrix Body)
  const innerGeom = new THREE.CapsuleGeometry(1.05, 2.2, 16, 32)
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x226a53,
    roughness: 0.5,
    metalness: 0.05,
    transparent: true,
    opacity: 0.35,
  })
  const innerMesh = new THREE.Mesh(innerGeom, innerMat)
  innerMesh.name = 'Matriks Mitokondria'
  group.add(innerMesh)

  // 3. Lipatan Membran Dalam (Cristae)
  const cristaeGroup = new THREE.Group()
  cristaeGroup.name = 'Krista'
  const foldCount = 7
  for (let i = 0; i < foldCount; i++) {
    const yPos = -1.2 + (i * 2.4) / (foldCount - 1)
    const radius = 0.95 * Math.cos((yPos / 2) * 1.1)
    const cristaGeom = new THREE.TorusGeometry(radius, 0.12, 12, 32, Math.PI * 1.5)
    const cristaMat = new THREE.MeshStandardMaterial({
      color: 0x4cd7f6, // Electric Cyan Accent
      roughness: 0.25,
      metalness: 0.2,
      emissive: 0x00404c,
      emissiveIntensity: 0.25,
    })
    const cristaMesh = new THREE.Mesh(cristaGeom, cristaMat)
    cristaMesh.position.y = yPos
    cristaMesh.rotation.x = Math.PI / 2
    cristaMesh.rotation.z = (i % 2 === 0 ? 0 : Math.PI) + (i * 0.2)
    cristaeGroup.add(cristaMesh)
  }
  group.add(cristaeGroup)

  // 4. DNA Sirkular & Ribosom (Partikel Titik / Sphere)
  const particleGroup = new THREE.Group()
  particleGroup.name = 'DNA Mitokondria & Ribosom'
  const particleMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b, // Amber Gold
    emissive: 0xd97706,
    emissiveIntensity: 0.4,
    roughness: 0.2,
  })
  const dotGeom = new THREE.SphereGeometry(0.06, 8, 8)
  for (let i = 0; i < 20; i++) {
    const dot = new THREE.Mesh(dotGeom, particleMat)
    const theta = Math.random() * Math.PI * 2
    const y = -1.0 + Math.random() * 2.0
    const r = Math.random() * 0.7
    dot.position.set(Math.cos(theta) * r, y, Math.sin(theta) * r)
    particleGroup.add(dot)
  }
  group.add(particleGroup)

  return group
}

/**
 * Membuat model prosedural Jantung Manusia (Human Heart)
 * Terdiri dari:
 * - Ventrikel & Atrium (Ovoid mesh)
 * - Arteri Aorta (Curved Tube)
 * - Vena Kava & Arteri Pulmonalis
 */
export function createProceduralHeart() {
  const group = new THREE.Group()
  group.name = 'ProceduralHeart'

  // Ventrikel Kiri & Kanan (Main Heart Body)
  const heartBodyGeom = new THREE.SphereGeometry(1.2, 32, 32)
  heartBodyGeom.scale(1, 1.35, 0.95)
  // Bentuk mengerucut di bagian apex (bawah)
  const pos = heartBodyGeom.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i)
    if (y < 0) {
      const taper = 1 + y * 0.35
      pos.setX(i, pos.getX(i) * Math.max(0.2, taper))
      pos.setZ(i, pos.getZ(i) * Math.max(0.2, taper))
    }
  }
  heartBodyGeom.computeVertexNormals()

  const heartMat = new THREE.MeshStandardMaterial({
    color: 0xb91c1c, // Crimson Red
    roughness: 0.35,
    metalness: 0.15,
  })
  const heartBody = new THREE.Mesh(heartBodyGeom, heartMat)
  heartBody.name = 'Miopati Ventrikel'
  group.add(heartBody)

  // Atrium Kanan & Kiri (Bagian Atas)
  const atriumGeom = new THREE.SphereGeometry(0.65, 24, 24)
  const atriumMat = new THREE.MeshStandardMaterial({
    color: 0x991b1b,
    roughness: 0.4,
  })
  const atriumRight = new THREE.Mesh(atriumGeom, atriumMat)
  atriumRight.position.set(-0.6, 1.1, 0.1)
  atriumRight.name = 'Atrium Kanan'
  group.add(atriumRight)

  const atriumLeft = new THREE.Mesh(atriumGeom, atriumMat)
  atriumLeft.position.set(0.6, 1.1, -0.1)
  atriumLeft.name = 'Atrium Kiri'
  group.add(atriumLeft)

  // Aorta (Lengkung Arteri Utama)
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.0, 0),
    new THREE.Vector3(0, 1.9, 0),
    new THREE.Vector3(-0.4, 2.2, 0),
    new THREE.Vector3(-0.8, 1.7, -0.3),
    new THREE.Vector3(-0.8, 0.8, -0.4),
  ])
  const aortaGeom = new THREE.TubeGeometry(aortaCurve, 32, 0.28, 16, false)
  const aortaMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626, // Scarlet
    roughness: 0.25,
    metalness: 0.2,
  })
  const aortaMesh = new THREE.Mesh(aortaGeom, aortaMat)
  aortaMesh.name = 'Aorta Asendens'
  group.add(aortaMesh)

  // Vena Kava Superior (Biru Tua)
  const venaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 0.9, -0.3),
    new THREE.Vector3(0.7, 1.9, -0.3),
  ])
  const venaGeom = new THREE.TubeGeometry(venaCurve, 16, 0.24, 16, false)
  const venaMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8, // Royal Blue
    roughness: 0.3,
    metalness: 0.15,
  })
  const venaMesh = new THREE.Mesh(venaGeom, venaMat)
  venaMesh.name = 'Vena Kava Superior'
  group.add(venaMesh)

  return group
}

/**
 * Membuat model prosedural Otak Manusia (Human Brain)
 * Terdiri dari:
 * - Hemisfer Serebrum Kiri & Kanan (Cerebrum)
 * - Serebelum (Cerebellum)
 * - Batang Otak (Brainstem)
 */
export function createProceduralBrain() {
  const group = new THREE.Group()
  group.name = 'ProceduralBrain'

  // Serebrum (Otak Besar - Dua belahan)
  const hemiGeom = new THREE.SphereGeometry(1.1, 32, 32)
  hemiGeom.scale(0.85, 1.05, 1.3)

  // Buat guratan sulkus/girus dengan noise prosedural
  const pos = hemiGeom.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const ripple = Math.sin(x * 12) * Math.cos(y * 10) * Math.sin(z * 12) * 0.04
    pos.setXYZ(i, x + ripple, y + ripple, z + ripple)
  }
  hemiGeom.computeVertexNormals()

  const brainMat = new THREE.MeshStandardMaterial({
    color: 0xfbcfe8, // Soft Brain Pink
    roughness: 0.6,
    metalness: 0.05,
  })

  const leftHemi = new THREE.Mesh(hemiGeom, brainMat)
  leftHemi.position.set(-0.6, 0.3, 0)
  leftHemi.name = 'Hemisfer Kiri (Serebrum)'
  group.add(leftHemi)

  const rightHemi = new THREE.Mesh(hemiGeom, brainMat)
  rightHemi.position.set(0.6, 0.3, 0)
  rightHemi.name = 'Hemisfer Kanan (Serebrum)'
  group.add(rightHemi)

  // Serebelum (Otak Kecil)
  const cerebGeom = new THREE.SphereGeometry(0.65, 24, 24)
  cerebGeom.scale(1.2, 0.7, 0.8)
  const cerebMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.7,
  })
  const cereb = new THREE.Mesh(cerebGeom, cerebMat)
  cereb.position.set(0, -0.65, -0.85)
  cereb.name = 'Serebelum (Otak Kecil)'
  group.add(cereb)

  // Batang Otak (Brainstem)
  const stemGeom = new THREE.CylinderGeometry(0.24, 0.3, 1.2, 20)
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xfce7f3,
    roughness: 0.45,
  })
  const stem = new THREE.Mesh(stemGeom, stemMat)
  stem.position.set(0, -1.0, -0.2)
  stem.rotation.x = 0.2
  stem.name = 'Batang Otak (Medula Oblongata)'
  group.add(stem)

  return group
}
