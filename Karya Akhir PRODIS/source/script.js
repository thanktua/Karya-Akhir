let saldo = document.getElementById("saldo");
let jumlahSiswa = document.getElementById("jumlah-siswa");
const judulBulan = document.getElementById("judul-bulan");
let input = document.getElementById("input");
let halaman = document.body;
let dataSiswa = document.getElementById("data-siswa");
const bulan = document.getElementById("bulan");
let saldoTotal = document.getElementById("total-saldo");
let bulanAktif = localStorage.getItem("bulanAktif") || "Januari";
let toogle = document.getElementById("toogle");
let siswa = [];

bulan.addEventListener("change", function() {

    bulanAktif = this.value;

    localStorage.setItem("bulanAktif", bulanAktif);

    judulBulan.textContent = bulanAktif;

    tampilkanData();

    // Hapus animasi sebelumnya
    halaman.classList.remove("animasi-bulan");

    // Paksa animasi dimulai ulang
    void halaman.offsetWidth;

    // Jalankan animasi
    halaman.classList.add("animasi-bulan");

});

const savedTheme = localStorage.getItem("temaKas");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toogle.checked = true;
}

toogle.addEventListener("change", function () {

    if (toogle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("temaKas", "dark");

    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("temaKas", "light");
    }

});

function simpanData() {
    localStorage.setItem("dataSiswa", JSON.stringify(siswa));
}

function ambilData() {
    const data = localStorage.getItem("dataSiswa");

    if (data) {
        siswa = JSON.parse(data);
    }
}

tambah.addEventListener("click", tambahSiswa);

bulan.addEventListener("change", function() {
    bulanAktif = this.value;

    localStorage.setItem("bulanAktif", bulanAktif);

    judulBulan.textContent = bulanAktif;

    tampilkanData();
});

function tambahSiswa() {
    const nama = input.value.trim();
    
    if (nama === "") {
        alert("Nama Nggk Boleh Kosong!!");
        return;
    }

    siswa.push ({
        nama:nama,

        kas: {
            Januari: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            February: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Maret: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            April: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Mei: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Juni: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            July: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Agustus: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            September: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Oktober: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            November: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },

            Desember: {
                minggu1:0,
                minggu2:0,
                minggu3:0,
                minggu4:0
            },
        }
    });

    simpanData();

    input.value = "";

    tampilkanData();
}

function tampilkanData() {
    dataSiswa.innerHTML = "";

    siswa.forEach(function(item,index) {
        const dataKas = item.kas[bulanAktif];

    const total =
        dataKas.minggu1 +
        dataKas.minggu2 +
        dataKas.minggu3 +
        dataKas.minggu4;

        dataSiswa.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td><input type="number" value="${dataKas.minggu1}" onchange="ubahKas(${index}, 'minggu1', this.value)"></td>
                <td><input type="number" value="${dataKas.minggu2}" onchange="ubahKas(${index}, 'minggu2', this.value)"></td>
                <td><input type="number" value="${dataKas.minggu3}" onchange="ubahKas(${index}, 'minggu3', this.value)"></td>
                <td><input type="number" value="${dataKas.minggu4}" onchange="ubahKas(${index}, 'minggu4', this.value)"></td>
                <td>Rp ${total.toLocaleString("id-ID")}</td>

                <td>
                    <button
                        class="btn-hapus"
                        onclick="hapusSiswa(${index})">
                        Hapus
                    </button>
                </td>
            </tr>
        `
    });

    updateDashboard();
}

function ubahKas(index, minggu, nilai) {
    siswa[index].kas[bulanAktif][minggu] = Number(nilai);

    simpanData();

    tampilkanData();

}

function hapusSiswa(index){

    let yakin = confirm("Yakin ingin menghapus siswa ini?");

    if(yakin){

        siswa.splice(index,1);

        simpanData();

        tampilkanData();

    }

}

function updateDashboard() {
    let totalBulan = 0;

    siswa.forEach(function(item) {

        const dataKas = item.kas[bulanAktif];

        totalBulan +=
            dataKas.minggu1 +
            dataKas.minggu2 +
            dataKas.minggu3 +
            dataKas.minggu4;
    });

    let totalSetahun = 0;

    siswa.forEach(function(item){

        for(let bulan in item.kas){

            totalSetahun +=
                item.kas[bulan].minggu1 +
                item.kas[bulan].minggu2 +
                item.kas[bulan].minggu3 +
                item.kas[bulan].minggu4;

        }

    });

    saldoTotal.innerHTML =
    "Rp " + totalSetahun.toLocaleString("id-ID");

    saldo.innerHTML = "Rp" + totalBulan.toLocaleString("id-ID");
    jumlahSiswa.innerHTML= siswa.length + " Siswa";
}

ambilData();

bulan.value = bulanAktif;

judulBulan.textContent = bulanAktif;

tampilkanData();