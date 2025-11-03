document.addEventListener('DOMContentLoaded', function() {

    // === 1. LOGIC HAMBURGER MENU ===
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Menggunakan 'active'
        });
    }

    // === 2. LOGIC MODAL GALERI MUSEUM (Berfungsi untuk menampilkan gambar yang diinputkan) ===
    const openMuseumBtn = document.getElementById('open-museum-gallery');
    const closeMuseumBtn = document.getElementById('close-museum-gallery');
    const museumModalOverlay = document.getElementById('museum-modal');

    if (openMuseumBtn && closeMuseumBtn && museumModalOverlay) {
        openMuseumBtn.addEventListener('click', function() {
            museumModalOverlay.style.display = 'flex'; 
        });

        closeMuseumBtn.addEventListener('click', function() {
            museumModalOverlay.style.display = 'none'; 
        });

        museumModalOverlay.addEventListener('click', function(event) {
            if (event.target === museumModalOverlay) {
                museumModalOverlay.style.display = 'none';
            }
        });
    }

    // === 3. LOGIC MODAL DETAIL WISATA (Jam Operasional & Detail) ===
    
    // Ambil elemen Modal dari HTML (HARUS memiliki ID: detail-destinasi-modal)
    const detailModalOverlay = document.getElementById('detail-destinasi-modal');
    if (!detailModalOverlay) {
        console.error("Modal Detail Destinasi tidak ditemukan di HTML.");
        return; 
    }

    // Ambil elemen di dalam Modal
    // Menggunakan ID yang ditambahkan di HTML
    const closeDetailModalButton = detailModalOverlay.querySelector('#close-detail-modal'); 
    const modalTitle = detailModalOverlay.querySelector('#modal-title');
    const modalHours = detailModalOverlay.querySelector('#modal-hours');
    const modalDescription = detailModalOverlay.querySelector('#modal-description');
    const modalGallery = detailModalOverlay.querySelector('#modal-gallery');

    // Event listener untuk tombol "Lihat Detail" pada setiap kartu wisata
    document.querySelectorAll('.destinasi-section .detail-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const kartu = this.closest('.kartu-wisata'); 
            
            // Mengambil semua data dari atribut data- di kartu (Termasuk data-hours)
            const title = kartu.getAttribute('data-title') || 'Destinasi Wisata';
            const hours = kartu.getAttribute('data-hours') || 'Jam operasional belum tersedia.';
            const description = kartu.getAttribute('data-description') || 'Deskripsi detail belum tersedia.';
            
            // Mengambil dan mengolah daftar gambar untuk galeri
            const imagesAttribute = kartu.getAttribute('data-images');
            // Menghasilkan array nama file gambar
            const images = imagesAttribute ? imagesAttribute.split(',').map(img => img.trim()) : [];

            // Mengisi konten modal dengan data
            modalTitle.textContent = title;
            modalHours.textContent = hours;
            modalDescription.textContent = description;
            
            // Memuat galeri
            modalGallery.innerHTML = ''; 
            if (images.length > 0 && modalGallery) {
                images.forEach(imgName => {
                    const imgTag = document.createElement('img');
                    imgTag.src = imgName; // Menggunakan nama file gambar dari data-images
                    imgTag.alt = title + ' image';
                    modalGallery.appendChild(imgTag);
                });
            } else if (modalGallery) {
                 modalGallery.innerHTML = '<p style="text-align: center; color: #888; margin-top: 1rem;">Galeri foto belum tersedia.</p>';
            }

            // Menampilkan modal
            detailModalOverlay.style.display = 'flex'; 
        });
    });

    // Event penutup modal detail (tombol X)
    if (closeDetailModalButton) {
        closeDetailModalButton.addEventListener('click', function() {
            detailModalOverlay.style.display = 'none';
        });
    }

    // Event penutup modal detail (klik di luar)
    detailModalOverlay.addEventListener('click', function(event) {
        if (event.target === detailModalOverlay) {
            detailModalOverlay.style.display = 'none';
        }
    });
});