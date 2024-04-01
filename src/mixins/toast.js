export default {
  methods: {
    showSuccessMessage(message) {
      this.$toast.add({
        severity: 'success',
        summary: 'Success',
        detail: message,
        group: 'br',
        life: 3000
      })
    },
    showErrorMessage(message) {
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        group: 'br',
        life: 3000
      })
    },
    showInfoMessage(message) {
      this.$toast.add({
        severity: 'info',
        summary: 'Info',
        detail: message,
        group: 'br',
        life: 3000
      })
    },
    showWarningMessage(message) {
      this.$toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: message,
        group: 'br',
        life: 3000
      })
    }
  }
}
