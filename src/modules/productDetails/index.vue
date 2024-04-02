
<script>
export default {
  data() {
    return {
      images: [
        {
          alt: '0',
          src: 'https://ultima.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-1.png'
        },
        {
          alt: '1',
          src: 'https://ultima.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-2.png'
        },
        {
          alt: '2',
          src: 'https://ultima.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-3.png'
        },
        {
          alt: '3',
          src: 'https://ultima.primevue.org/demo/images/ecommerce/productoverview/product-overview-3-4.png'
        }
      ],
      selectedIndex: 0,
      tabs: [
        {
          title: 'Description',
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam sollicitudin tempor id eu nisl nunc. Scelerisque in dictum non consectetur a erat nam at. Turpis egestas pretium aenean pharetra magna ac placerat. Dignissim enim sit amet venenatis urna cursus eget. Lacus luctus accumsan tortor posuere ac. Aliquam sem fringilla ut morbi tincidunt. Lorem ipsum dolor sit amet consectetur adipiscing elit. Ultrices neque ornare aenean euismod elementum nisi quis. Amet justo donec enim diam vulputate.

A diam sollicitudin tempor id eu nisl. Penatibus et magnis dis parturient montes nascetur. Bibendum at varius vel pharetra vel turpis nunc. Consectetur lorem donec massa sapien faucibus et molestie. Feugiat sed lectus vestibulum mattis ullamcorper velit sed. Dui faucibus in ornare quam viverra orci sagittis. Sem et tortor consequat id. Molestie ac feugiat sed lectus vestibulum. Vitae aliquet nec ullamcorper sit amet. Neque viverra justo nec ultrices dui sapien eget. Ut tellus elementum sagittis vitae et. Parturient montes nascetur ridiculus mus mauris. Mauris pharetra et ultrices neque. Neque sodales ut etiam sit amet nisl. Faucibus in ornare quam viverra orci sagittis. Molestie at elementum eu facilisis sed odio morbi. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Velit scelerisque in dictum non consectetur a erat nam. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac.`},
        { title: 'Tab 2', content: 'Tab 2 Content' },
        { title: 'Tab 3', content: 'Tab 3 Content' }
      ]
    }
  },
  computed: {
    selectedImage() {
      return this.images[this.selectedIndex]
    }
  },
  methods: {
    selectImage(index) {
      this.selectedIndex = index
    }
  }
}
</script>

<template>
  <div class="layout-content">
    <div class="card">
      <div class="grid mb-7">
        <div class="col-12 lg:col-7">
          <div class="flex">
            <div class="flex flex-column w-2 justify-content-between" style="row-gap: 1rem">
              <img
                v-for="(item, index) in images"
                :key="index"
                :src="item.src"
                :alt="item.alt"
                :class="[
                  'w-full',
                  'cursor-pointer',
                  'border-2',
                  'border-transparent',
                  'transition-colors',
                  'transition-duration-150',
                  'border-round',
                  { 'border-primary': selectedIndex === index }
                ]"
                @click="selectImage(index)"
              />
            </div>
            <div class="pl-3 w-10 flex">
              <img
                :src="selectedImage.src"
                :alt="selectedImage.alt"
                class="w-full border-2 border-transparent border-round"
              />
            </div>
          </div>
        </div>
        <div class="col-12 lg:col-4 py-3 lg:pl-6">
          <div class="flex align-items-center text-xl font-medium text-900 mb-4">
            Product Title Placeholder
          </div>
          <div class="flex align-items-center justify-content-between mb-5">
            <span class="text-900 font-medium text-3xl block">$120</span>
            <div class="flex align-items-center">
              <span class="mr-3"
                ><i class="pi pi-star-fill text-yellow-500 mr-1"></i
                ><i class="pi pi-star-fill text-yellow-500 mr-1"></i
                ><i class="pi pi-star-fill text-yellow-500 mr-1"></i
                ><i class="pi pi-star-fill text-yellow-500 mr-1"></i
                ><i class="pi pi-star text-600 mr-1"></i></span
              ><span class="text-sm"
                ><b class="text-900 mr-1">24</b> <span class="text-500"></span>reviews
              </span>
            </div>
          </div>
          <div class="font-bold text-900 mb-3">Color</div>
          <div class="flex align-items-center mb-5">
            <div
              class="w-2rem h-2rem flex-shrink-0 border-circle bg-bluegray-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
              style="box-shadow: 0 0 0 0.2rem var(--bluegray-500)"
            ></div>
            <div
              class="w-2rem h-2rem flex-shrink-0 border-circle bg-green-500 mr-3 cursor-pointer border-2 surface-border transition-all transition-duration-300"
            ></div>
            <div
              class="w-2rem h-2rem flex-shrink-0 border-circle bg-blue-500 cursor-pointer border-2 surface-border transition-all transition-duration-300"
            ></div>
          </div>
          <div class="mb-3 flex align-items-center justify-content-between">
            <span class="font-bold text-900">Size</span
            ><a tabindex="0" class="cursor-pointer text-600 text-sm flex align-items-center">
              Size Guide <i class="ml-1 pi pi-angle-right"></i
            ></a>
          </div>
          <div class="grid grid-nogutter align-items-center mb-5">
            <div
              class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors border-primary border-2 text-primary"
            >
              XS
            </div>
            <div
              class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
            >
              S
            </div>
            <div
              class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
            >
              M
            </div>
            <div
              class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round mr-3 cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
            >
              L
            </div>
            <div
              class="col h-3rem border-1 border-300 text-900 inline-flex justify-content-center align-items-center flex-shrink-0 border-round cursor-pointer hover:surface-100 transition-duration-150 transition-colors"
            >
              XL
            </div>
          </div>
          <div class="font-bold text-900 mb-3">Quantity</div>
          <div
            class="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between"
          >
            <span
              class="p-inputnumber p-component p-inputwrapper p-inputwrapper-filled p-inputnumber-buttons-horizontal border-1 surface-border border-round"
              data-pc-name="inputnumber"
              data-pc-section="root"
              ><input
                class="p-inputtext p-component p-inputnumber-input w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                role="spinbutton"
                aria-valuemin="0"
                aria-valuenow="1"
                data-pc-name="input"
                data-pc-extend="inputtext"
                data-pc-section="root" />
              <button
                class="p-button p-component p-button-icon-only p-inputnumber-button p-inputnumber-button-up p-button-text text-600 hover:text-primary py-1 px-1"
                type="button"
                tabindex="-1"
                aria-hidden="true"
                data-pc-name="incrementbutton"
                data-pc-extend="button"
                data-pc-section="root"
                data-pd-ripple="true"
              >
                <span class="pi pi-plus" data-pc-section="incrementbuttonicon"></span
                ><span class="p-button-label" data-pc-section="label">&nbsp;</span
                ><span
                  role="presentation"
                  aria-hidden="true"
                  data-p-ink="true"
                  data-p-ink-active="false"
                  class="p-ink"
                  data-pc-name="ripple"
                  data-pc-section="root"
                ></span></button
              ><button
                class="p-button p-component p-button-icon-only p-inputnumber-button p-inputnumber-button-down p-button-text text-600 hover:text-primary py-1 px-1"
                type="button"
                tabindex="-1"
                aria-hidden="true"
                data-pc-name="decrementbutton"
                data-pc-extend="button"
                data-pc-section="root"
                data-pd-ripple="true"
              >
                <span class="pi pi-minus" data-pc-section="decrementbuttonicon"></span
                ><span class="p-button-label" data-pc-section="label">&nbsp;</span
                ><span
                  role="presentation"
                  aria-hidden="true"
                  data-p-ink="true"
                  data-p-ink-active="false"
                  class="p-ink"
                  data-pc-name="ripple"
                  data-pc-section="root"
                ></span></button
            ></span>
            <div class="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 sm:ml-5">
              <button
                class="p-button p-component flex-1 mr-5"
                type="button"
                aria-label="Add to Cart"
                data-pc-name="button"
                data-pc-section="root"
                data-pd-ripple="true"
              >
                <span class="p-button-label" data-pc-section="label">Add to Cart</span
                ><span
                  role="presentation"
                  aria-hidden="true"
                  data-p-ink="true"
                  data-p-ink-active="false"
                  class="p-ink"
                  data-pc-name="ripple"
                  data-pc-section="root"
                ></span></button
              ><i class="pi text-2xl cursor-pointer pi-heart text-600"></i>
            </div>
          </div>
        </div>
      </div>
      <TabView>
        <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
          <p class="m-0">{{ tab.content }}</p>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<style></style>
