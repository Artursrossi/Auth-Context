export const RemoveLoadingAnimation = (): void => {
  const LoadingSpinnerID = document.getElementById('loadingSpinner')
  const LoadingButtonID = document.getElementById('loadingButton')

  LoadingSpinnerID?.classList.add('displayNone')
  LoadingButtonID?.classList.remove('displayNone')
}
