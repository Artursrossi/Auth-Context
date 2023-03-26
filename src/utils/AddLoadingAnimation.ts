export const AddLoadingAnimation = (): void => {
  const LoadingSpinnerID = document.getElementById('loadingSpinner')
  const LoadingButtonID = document.getElementById('loadingButton')

  LoadingSpinnerID?.classList.remove('displayNone')
  LoadingButtonID?.classList.add('displayNone')
}
