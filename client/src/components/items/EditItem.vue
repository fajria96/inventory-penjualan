<template>
	<div>
    <br>
    <p class="is-size-3 has-text-weight-bold">Halaman Edit Item</p>
	<br>
	<div class="field">
		<label class="label">Nama Item</label>
		<div class="control">
		<input
			required
			class="input"
			type="text"
			v-model="nama_item"
		/>
		</div>
	</div>
	
	<div class="field">
		<label class="label">Unit</label>
		<div class="select">
		<select required v-model="unit_id">
			<option value="1">Kg</option>
			<option value="2">Pcs</option>
		</select>
		</div>
	</div>

	<div class="field">
		<label class="label">Stok</label>
		<div class="control">
		<input
			required
			class="input"
			type="number"
			v-model="stok"
		/>
		</div>
	</div>

	<div class="field">
		<label class="label">Harga Satuan</label>
		<div class="control">
		<input
			required
			class="input"
			type="number"
			v-model="harga_satuan"
		/>
		</div>
	</div>

	<label class="label">Gambar Barang</label>
	<div class="file">
		<input required type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" />
	</div>
	
	<br>
    <p>Semua field harus diisi.</p>
	<br>
	<div class="control">
		<button class="button is-success" @click="updateItem">SAVE</button>
	</div>
	</div>
</template>
	
<script>
// import axios
import axios from "axios";
	
export default {
	name: "EditItem",
	data() {
		return {
			nama_item: "",
			unit_id: "",
			stok: "",
			harga_satuan: "",
			barang: ""
		};
	},
    created: function () {
        this.getItemById();
    },
	methods: {
        // Get Item By Id
        async getItemById() {
            try {
                const response = await axios.get(
                    `http://localhost:4000/items/${this.$route.params.id}`
                );

                this.nama_item = response.data.nama_item;
                this.unit_id = response.data.unit_id;
                this.stok = response.data.stok;
                this.nama_item = response.data.nama_item;
                this.harga_satuan = response.data.harga_satuan;

            } catch (err) {
                console.log(err);
            }
        },

		// Create New item
		async updateItem() {
			try {
				let formData = new FormData();
				formData.append('nama_item', this.nama_item);
				formData.append('unit_id', this.unit_id);
				formData.append('stok', this.stok);
				formData.append('harga_satuan', this.harga_satuan);
				formData.append('barang', this.barang);

				await axios.put(`http://localhost:4000/items/${this.$route.params.id}`, 
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				);

				this.nama_item = "",
				this.unit_id = "",
				this.stok = "",
				this.harga_satuan = "",
				this.barang = ""
                
                alert("Berhasil Edit");

				this.$router.push("/");

			} catch (err) {
				console.log(err);
			}
		},

		onChangeFileUpload(){
			this.barang = this.$refs.file.files[0];
		}
	},
};
</script>
	
<style>
</style>