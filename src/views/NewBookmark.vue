<template>
   <div class="login_register_container">
      <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
      <input autofocus ref="title" v-model="userData.title" type="text" placeholder="Başlık" class="input mb-3" />
      <input v-model="userData.url" type="text" placeholder="URL" class="input mb-3" />
      <select v-model="userData.category_id" class="input mb-3">
        <option disabled value="" selected>Kategori</option>
        <option v-for="category in categoryList" :key="category.id" :value="category.name">{{category.name}}</option>
      </select>
      <textarea v-model="userData.desctiption" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
      <div class="flex items-center justify-end gap-x-1">
        <button @click="$router.push({name:'HomePage'})" class="secondary-button">İptal</button>
        <button @click="onSave" class="default-button">Kaydet</button>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      categoryList:[],
      userData:{
        title: null,
        url: null,
        category_id: null,
        desctiption: null
      }
    }
  },
  mounted(){
    this.$appAxios.get("/categories").then(category_response => {
      // console.log(category_response);
      this.categoryList = category_response?.data || [];
    })
    
    // console.dir(this.$refs.title.$el.focus());

  },
  methods:{
    onSave(){
      console.log(this.userData);
      console.log(this._getCurrentUser);
      const saveData = {
        ...this.userData,
        user_id : this._getCurrentUser?.id,
        created_at : new Date()
      }
      this.$appAxios.post("/bookmarks", saveData).then(save_bookmark_response =>{
        console.log(save_bookmark_response);
        Object.keys(this.userData)?.forEach(field => this.userData[field]=null)
        this.$router.push({name:'HomePage'});
      })
    }
  },
  computed:{
    ...mapGetters(["_getCurrentUser"])
  }
}
</script>