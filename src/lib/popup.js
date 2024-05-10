/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"

export const PopUp = () => {
    useEffect(() => {
        const div = document.createElement("div");

        div.innerHTML = `
        	<div  role="presentation" class="MuiModal-root css-8ndowl" id="modal_popup" style="display: none">
                <div aria-hidden="true" class="MuiBackdrop-root Modal_backdrop__yVk2e MuiModal-backdrop css-919eu4" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"></div>


                <div class="Modal_root__F4wBR">
                    <div  id="popCont" class="Modal_container__oPBQL">
                        <div class="Modal_body__qJBCh">
                            <div class="ConnectWalletModal_root__H_AyV">
                                <svg viewBox="0 0 56 56" fill="none" class="ConnectWalletModal_icon__H1En5">
                                    <rect x="4" y="4" width="48" height="48" rx="24" fill="#F4EBFF"></rect>
                                    <path
                                        d="M20.7025 36H35.2975C37.0872 36 38 35.0771 38 33.2678V22.723C38 20.9229 37.0872 20 35.2975 20H20.7025C18.9128 20 18 20.9138 18 22.723V33.2678C18 35.0771 18.9128 36 20.7025 36ZM19.4765 22.8235C19.4765 21.9463 19.9329 21.5077 20.7562 21.5077H35.2438C36.0582 21.5077 36.5235 21.9463 36.5235 22.8235V24.1119H19.4765V22.8235ZM20.7562 34.4923C19.9329 34.4923 19.4765 34.0445 19.4765 33.1673V26.0948H36.5235V33.1673C36.5235 34.0445 36.0582 34.4923 35.2438 34.4923H20.7562Z"
                                        fill="#6941C6"
                                    ></path>
                                    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#F9F5FF" stroke-width="8"></rect>
                                </svg>
                                <p class="ConnectWalletModal_title__Ln_BK text-lg semibold __inter">Connect Wallet</p>
                                <p class="ConnectWalletModal_description__FQ0Lw text-sm regular __inter">Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.</p>
                                <div class="ConnectWalletModal_actions__MtWCb __inter">

                                    <div  data-id="unisatConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-unisat.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Unisat
                                    </div>

                                    <div data-id="xverseConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-xverse.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Xverse
                                    </div>

                                    <div data-id="magicConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/magic.jpg" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Magic eden
                                    </div>

                                    <div data-id="leatherConnect" class="text-md bold ConnectWalletModal_action__766BA">
                                        <img src="img/connect-leather.png" class="ConnectWalletModal_actionIcon__hgvbK" />
                                        Leather
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        document.body.appendChild(div)
        ///////////

        const buttonsHiro = document.querySelectorAll('[data-id="connect_button_modal"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "opacity: 0;  transition: all 0.2s ease-in-out;"

                setTimeout(() => {
                    document.getElementById("modal_popup").style = "opacity: 1;  transition: all 0.2s ease-in-out;"
                }, 200)
            })
        }


        const popCont = document.getElementById("popCont")

        let status = false
       
        popCont.onmouseover = () => {
            status = true
        }
        popCont.onmouseleave = () => {
         
            status = false
        }

        document.getElementById("modal_popup").addEventListener("click", () => {
            if(status === false) {
                document.getElementById("modal_popup").style = "display: none"
            }
            
        })
    
    
    }, [null])

    return null
}

export const PopUp2 = () => {
    useEffect(() => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="conteiner-pop-2"  id="modal_popup" style="display: none">
                <div class="conteiner-back-pop-2"></div>

                <div class="menu-cont-pop-2" >
                    <div
                        class="menu-pop-2"
                        id="popCont"
                    >
                        <div class="menu-header-pop-2">

                            <div>
                                <div class="menu-header-title-cont-pop-2">
                                    <h1 class="menu-header-title-pop-2">Connect Wallet</h1>
                                    <button class="menu-header-button-pop-2" tabindex="0" id="clsoe-pop">
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            color="#f5f3f7"
                                            width="20"
                                            height="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style="color: rgb(245, 243, 247);"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                </div>

                                <p class="menu-header-text-pop-2">Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.</p>
                            </div>

                        </div>




                        <div class="menu-body-cont-pop-2">
                            <div class="menu-body-select-cont-pop-2">
                                <div class="menu-body-menu-sw-cont-pop-2">

                                    <div class="wallet-modal-tab-pop-2" >
                                        <span style="margin-right: 0.5rem;">
                                            <svg width="16" height="16" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="ty-my-auto" size="16">
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M1.03053 5.075C1.0497 5.05192 1.07287 5.03339 1.09864 5.0205C1.12442 5.00762 1.15227 5.00064 1.18053 5H5.89344C5.9134 5.00031 5.93281 5.00702 5.9494 5.01931C5.966 5.03161 5.97905 5.04897 5.98698 5.0693C5.99491 5.08964 5.99738 5.11208 5.99407 5.13394C5.9908 5.15579 5.98192 5.17613 5.96847 5.1925L4.96947 6.425C4.9503 6.44807 4.92713 6.46661 4.90135 6.4795C4.87558 6.49239 4.84773 6.49936 4.81947 6.5H0.103541C0.0836005 6.49969 0.0641653 6.49298 0.0475735 6.48069C0.0309822 6.46839 0.0179408 6.45103 0.0100181 6.4307C0.00209544 6.41036 -0.000371092 6.38792 0.00291498 6.36606C0.00620106 6.34421 0.0151002 6.32387 0.0285421 6.3075L1.03053 5.075ZM5.97297 4.05333C5.98642 4.0697 5.9953 4.09004 5.99857 4.11189C6.00188 4.13375 5.99941 4.15619 5.99148 4.17653C5.98355 4.19687 5.9705 4.21423 5.9539 4.22652C5.93731 4.23881 5.9179 4.24552 5.89794 4.24583L1.18352 4.25C1.15527 4.24936 1.12742 4.24239 1.10164 4.2295C1.07587 4.21661 1.0527 4.19807 1.03353 4.175L0.0270419 2.94667C0.0136006 2.9303 0.00470146 2.90996 0.00141482 2.88811C-0.00187126 2.86625 0.000595274 2.84381 0.00851797 2.82347C0.0164407 2.80313 0.029482 2.78578 0.0460739 2.77348C0.0626651 2.76119 0.0821003 2.75448 0.102041 2.75417L4.81647 2.75C4.84473 2.75064 4.87258 2.75761 4.89835 2.7705C4.92413 2.78339 4.9473 2.80192 4.96647 2.825L5.97297 4.05333ZM1.03053 0.575C1.0497 0.551926 1.07287 0.53339 1.09864 0.520503C1.12442 0.507616 1.15227 0.500642 1.18053 0.5L5.89647 0.504167C5.91639 0.504479 5.93585 0.511185 5.95244 0.52348C5.96904 0.535775 5.98209 0.553134 5.98996 0.573469C5.99789 0.593804 6.00037 0.61625 5.9971 0.638106C5.99378 0.659962 5.9849 0.680297 5.97145 0.696667L4.96947 1.925C4.9503 1.94807 4.92713 1.96661 4.90135 1.9795C4.87558 1.99239 4.84773 1.99936 4.81947 2H0.103541C0.0836005 1.99969 0.0641653 1.99298 0.0475735 1.98069C0.0309822 1.96839 0.0179408 1.95103 0.0100181 1.9307C0.00209544 1.91036 -0.000371092 1.88792 0.00291498 1.86606C0.00620106 1.84421 0.0151002 1.82387 0.0285421 1.8075L1.03053 0.575Z"
                                                    fill="url(#solana-slim-icon-linear)"
                                                ></path>
                                                <linearGradient id="solana-slim-icon-linear" x1="0.18229" y1="6.63083" x2="6.40937" y2="1.02656" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#9945FF"></stop>
                                                    <stop offset="0.14" stop-color="#8A53F4"></stop>
                                                    <stop offset="0.42" stop-color="#6377D6"></stop>
                                                    <stop offset="0.79" stop-color="#24B0A7"></stop>
                                                    <stop offset="0.99" stop-color="#00D18C"></stop>
                                                    <stop offset="1" stop-color="#00D18C"></stop>
                                                </linearGradient>
                                            </svg>
                                        </span>
                                        <span class="wallet-modal-tab-text-pop-2">solana</span>
                                    </div>

                                    <div class="wallet-modal-tab-pop-2 active-tab-pop-2">
                                        <span style="margin-right: 0.5rem;">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                image-rendering="optimizeQuality"
                                                shape-rendering="geometricPrecision"
                                                text-rendering="geometricPrecision"
                                                viewBox="0 0 4091.27 4091.73"
                                                class="ty-my-auto"
                                                width="16"
                                                height="16"
                                                size="16"
                                            >
                                                <g>
                                                    <g fill-rule="nonzero">
                                                        <path
                                                            fill="#F7931A"
                                                            d="M4030.06 2540.77C3756.82 3636.78 2646.74 4303.79 1550.6 4030.48 454.92 3757.24-212.09 2647.09 61.27 1551.17c273.12-1096.13 1383.2-1763.19 2479-1489.95C3636.33 334.46 4303.3 1444.73 4030.03 2540.79l.02-.02z"
                                                        ></path>
                                                        <path
                                                            fill="#fff"
                                                            d="M2947.77 1754.38c40.72-272.26-166.56-418.61-450-516.24l91.95-368.8-224.5-55.94-89.51 359.09c-59.02-14.72-119.63-28.59-179.87-42.34L2186 768.69l-224.36-55.94-92 368.68c-48.84-11.12-96.81-22.11-143.35-33.69l.26-1.16-309.59-77.31-59.72 239.78s166.56 38.18 163.05 40.53c90.91 22.69 107.35 82.87 104.62 130.57l-104.74 420.15c6.26 1.59 14.38 3.89 23.34 7.49-7.49-1.86-15.46-3.89-23.73-5.87l-146.81 588.57c-11.11 27.62-39.31 69.07-102.87 53.33 2.25 3.26-163.17-40.72-163.17-40.72l-111.46 256.98 292.15 72.83c54.35 13.63 107.61 27.89 160.06 41.3l-92.9 373.03 224.24 55.94 92-369.07c61.26 16.63 120.71 31.97 178.91 46.43l-91.69 367.33 224.51 55.94 92.89-372.33c382.82 72.45 670.67 43.24 791.83-303.02 97.63-278.78-4.86-439.58-206.26-544.44 146.69-33.83 257.18-130.31 286.64-329.61l-.07-.05zm-512.93 719.26c-69.38 278.78-538.76 128.08-690.94 90.29l123.28-494.2c152.17 37.99 640.17 113.17 567.67 403.91zm69.43-723.3c-63.29 253.58-453.96 124.75-580.69 93.16l111.77-448.21c126.73 31.59 534.85 90.55 468.94 355.05h-.02z"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </svg>
                                        </span>

                                        <span class="wallet-modal-tab-text-pop-2 active-tab-text-pop-2">bitcoin</span>
                                    </div>


                                    <div class="wallet-modal-tab-pop-2">
                                        <span style="margin-right: 0.5rem;">
                                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="ty-my-auto" width="16" height="16" size="16">
                                                <path d="M15.7313 21.1023L15.7333 12.1294L7.11983 15.9092L15.7313 21.1023Z" fill="#90A9EB"></path>
                                                <path d="M15.7799 12.1294L15.7779 21.1044L24.3929 15.9092L15.7799 12.1294Z" fill="#C6B4F0"></path>
                                                <path d="M24.3841 15.8587L15.7779 1.71851L15.7799 12.083L24.3841 15.8587Z" fill="#C7F8F6"></path>
                                                <path d="M15.7787 22.57L15.7779 29.4968L24.4002 17.6262L15.7787 22.57Z" fill="#C5B2F1"></path>
                                                <path d="M15.7313 29.4921L15.7321 22.5685L7.11257 17.6262L15.7313 29.4921Z" fill="#EACEC6"></path>
                                                <path d="M7.12875 15.8589L15.7333 12.0831L15.7313 1.72412L7.12875 15.8589Z" fill="#EACEC4"></path>
                                                <path
                                                    d="M15.7561 21.1668L15.773 21.1574L24.4517 15.9237L24.4694 15.9132L15.777 1.63018L15.7569 1.6001L15.7363 1.63018L7.0431 15.9132L15.7395 21.1577L15.7561 21.1672V21.1668ZM24.384 15.8588L15.7798 12.0831L15.7782 1.7186L24.384 15.8588ZM15.7798 12.1294L24.3929 15.9092L15.7782 21.1045L15.7798 12.1294ZM15.7315 21.1023L7.12006 15.9092L15.7335 12.1294L15.7315 21.1023ZM7.12892 15.8588L15.7315 1.72404L15.7335 12.0831L7.12892 15.8588Z"
                                                    fill="#686DCC"
                                                ></path>
                                                <path
                                                    d="M6.95647 17.4873L15.7408 29.5807L15.7565 29.6003L15.7726 29.5807L24.5565 17.4873L15.7565 22.5333L6.95647 17.4873ZM15.7315 29.4923L7.1128 17.6265L15.7323 22.5688L15.7315 29.4923ZM15.7786 22.5702L24.4001 17.6265L15.7782 29.497L15.779 22.5702H15.7786Z"
                                                    fill="#686DCC"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span class="wallet-modal-tab-text-pop-2">ethereum</span>
                                    </div>


                                    <div class="wallet-modal-tab-pop-2">
                                        <span style="margin-right: 0.5rem;">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" class="ty-my-auto" color="#f5f3f7" width="16" height="16" size="16">
                                                <defs>
                                                    <linearGradient id=":r3q:" x1="54.83" y1="392.31" x2="459.03" y2="97.58" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0" stop-color="#a726c1"></stop>
                                                        <stop offset=".88" stop-color="#803bdf"></stop>
                                                        <stop offset="1" stop-color="#7b3fe4"></stop>
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    fill="url(#:r3q:)"
                                                    d="m364.03,335.08l111.55-64.4c5.9-3.41,9.57-9.76,9.57-16.58V125.28c0-6.81-3.67-13.17-9.57-16.58l-111.55-64.4c-5.9-3.41-13.24-3.4-19.14,0l-111.55,64.4c-5.9,3.41-9.57,9.76-9.57,16.58v230.19l-78.22,45.15-78.22-45.15v-90.33l78.22-45.15,51.6,29.78v-60.59l-42.03-24.26c-2.9-1.67-6.21-2.55-9.57-2.55s-6.67.88-9.57,2.55L24.42,229.33c-5.9,3.41-9.57,9.76-9.57,16.58v128.81c0,6.81,3.67,13.17,9.57,16.58l111.55,64.41c5.9,3.4,13.23,3.4,19.14,0l111.55-64.4c5.9-3.41,9.57-9.77,9.57-16.58v-230.19l1.41-.81,76.81-44.34,78.22,45.16v90.32l-78.22,45.16-51.52-29.74v60.59l41.95,24.23c5.9,3.4,13.24,3.4,19.14,0Z"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span class="wallet-modal-tab-text-pop-2">polygon</span>
                                    </div>
                                </div>


                                <div class="tw-px-3 tw-py-2 border-pop-2">

                                    <div class="wallet-modal-body-cont-pop-2">
                                        <button class="wallet-modal-body-botton-pop-2" data-id="magicConnect">
                                            <div class="wallet-modal-body-content-pop-2">
                                                <img
                                                    height="28"
                                                    width="28"
                                                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEzLjc3OCIgZmlsbD0iIzFDMTMyNiIvPgo8cGF0aCBkPSJNMzI2LjYyMyAyMDcuMDA2TDM0Ni4xMjcgMjI5LjkyM0MzNDguMzYgMjMyLjQ5NyAzNTAuMzQgMjM0LjYxNCAzNTEuMTQgMjM1LjgxOEMzNTYuOTczIDI0MS42MTUgMzYwLjI0NCAyNDkuNDUgMzYwLjIzOSAyNTcuNjE0QzM1OS42OTIgMjY3LjI0NSAzNTMuNDE1IDI3My44MDUgMzQ3LjYwMSAyODAuODIxTDMzMy45NTMgMjk2Ljg0NkwzMjYuODMzIDMwNS4xNDlDMzI2LjU3OCAzMDUuNDM1IDMyNi40MTMgMzA1Ljc4OSAzMjYuMzYgMzA2LjE2N0MzMjYuMzA2IDMwNi41NDQgMzI2LjM2NiAzMDYuOTI5IDMyNi41MzEgMzA3LjI3M0MzMjYuNjk3IDMwNy42MTggMzI2Ljk2MiAzMDcuOTA3IDMyNy4yOTIgMzA4LjEwNUMzMjcuNjIzIDMwOC4zMDMgMzI4LjAwNSAzMDguNDAxIDMyOC4zOTIgMzA4LjM4N0gzOTkuNTQzQzQxMC40MTEgMzA4LjM4NyA0MjQuMTAyIDMxNy41MiA0MjMuMzAyIDMzMS4zODdDNDIzLjI4IDMzNy42ODkgNDIwLjcyOSAzNDMuNzI3IDQxNi4yMDcgMzQ4LjE4M0M0MTEuNjg1IDM1Mi42NCA0MDUuNTU5IDM1NS4xNTMgMzk5LjE2NCAzNTUuMTc1SDI4Ny43NEMyODAuNDEgMzU1LjE3NSAyNjAuNjk1IDM1NS45NjQgMjU1LjE3NyAzMzkuMTVDMjU0LjAwMyAzMzUuNjM3IDI1My44NDMgMzMxLjg3MSAyNTQuNzE0IDMyOC4yNzNDMjU2LjMxOCAzMjIuOTUyIDI1OC44NTUgMzE3Ljk1IDI2Mi4yMTIgMzEzLjQ5M0MyNjcuODE1IDMwNS4xOSAyNzMuODgxIDI5Ni44ODcgMjc5Ljg2MyAyODguODMzQzI4Ny41NzIgMjc4LjI4OCAyOTUuNDkyIDI2OC4wNzUgMzAzLjI4NSAyNTcuMzIzQzMwMy41NjIgMjU2Ljk3MyAzMDMuNzEyIDI1Ni41NDIgMzAzLjcxMiAyNTYuMDk4QzMwMy43MTIgMjU1LjY1NSAzMDMuNTYyIDI1NS4yMjQgMzAzLjI4NSAyNTQuODc0TDI3NC45NzYgMjIxLjY2MUMyNzQuNzkyIDIyMS40MiAyNzQuNTUzIDIyMS4yMjUgMjc0LjI3OSAyMjEuMDkxQzI3NC4wMDUgMjIwLjk1NiAyNzMuNzAzIDIyMC44ODYgMjczLjM5NiAyMjAuODg2QzI3My4wOSAyMjAuODg2IDI3Mi43ODggMjIwLjk1NiAyNzIuNTE0IDIyMS4wOTFDMjcyLjI0IDIyMS4yMjUgMjcyLjAwMSAyMjEuNDIgMjcxLjgxNyAyMjEuNjYxQzI2NC4yMzQgMjMxLjc0OSAyMzEuMDM5IDI3Ni40MiAyMjMuOTYyIDI4NS40N0MyMTYuODg0IDI5NC41MjEgMTk5LjQ0NCAyOTUuMDE5IDE4OS43OTcgMjg1LjQ3TDE0NS41MjMgMjQxLjY3MkMxNDUuMjQgMjQxLjM5MiAxNDQuODc5IDI0MS4yMDEgMTQ0LjQ4NyAyNDEuMTI0QzE0NC4wOTQgMjQxLjA0NyAxNDMuNjg2IDI0MS4wODYgMTQzLjMxNiAyNDEuMjM4QzE0Mi45NDYgMjQxLjM4OSAxNDIuNjMgMjQxLjY0NSAxNDIuNDA4IDI0MS45NzRDMTQyLjE4NiAyNDIuMzAyIDE0Mi4wNjggMjQyLjY4OCAxNDIuMDY5IDI0My4wODNWMzI3LjMxOEMxNDIuMTczIDMzMy4yOTYgMTQwLjM3NyAzMzkuMTU2IDEzNi45MzIgMzQ0LjA3N0MxMzMuNDg3IDM0OC45OTggMTI4LjU2NiAzNTIuNzMzIDEyMi44NTkgMzU0Ljc2QzExOS4yMTIgMzU2LjAxMSAxMTUuMzE1IDM1Ni4zODQgMTExLjQ5MiAzNTUuODQ5QzEwNy42NjkgMzU1LjMxNCAxMDQuMDMxIDM1My44ODYgMTAwLjg4MiAzNTEuNjg0Qzk3LjczMjggMzQ5LjQ4MyA5NS4xNjMyIDM0Ni41NzEgOTMuMzg3NyAzNDMuMTkxQzkxLjYxMjEgMzM5LjgxMiA5MC42ODIxIDMzNi4wNjQgOTAuNjc1IDMzMi4yNThWMTgwLjgxQzkwLjkyODggMTc1LjM1MiA5Mi45MjE1IDE3MC4xMTIgOTYuMzcgMTY1LjgzNEM5OS44MTg1IDE2MS41NTYgMTA0LjU0NyAxNTguNDU4IDEwOS44ODQgMTU2Ljk4QzExNC40NjMgMTU1Ljc3OCAxMTkuMjgyIDE1NS43OSAxMjMuODU0IDE1Ny4wMTVDMTI4LjQyNiAxNTguMjQgMTMyLjU4OCAxNjAuNjM0IDEzNS45MTggMTYzLjk1NUwyMDMuOTk0IDIzMS4xMjdDMjA0LjE5OCAyMzEuMzMxIDIwNC40NDQgMjMxLjQ4OCAyMDQuNzE3IDIzMS41ODhDMjA0Ljk4OSAyMzEuNjg3IDIwNS4yOCAyMzEuNzI3IDIwNS41NyAyMzEuNzAzQzIwNS44NTkgMjMxLjY3OSAyMDYuMTQgMjMxLjU5MyAyMDYuMzkyIDIzMS40NUMyMDYuNjQzIDIzMS4zMDggMjA2Ljg2IDIzMS4xMTIgMjA3LjAyNyAyMzAuODc4TDI1NS4zODggMTY0LjkxQzI1Ny42MjIgMTYyLjIzMiAyNjAuNDI0IDE2MC4wNjcgMjYzLjU5NyAxNTguNTY5QzI2Ni43NyAxNTcuMDcgMjcwLjIzNiAxNTYuMjczIDI3My43NTUgMTU2LjIzM0gzOTkuNTQzQzQwMi45ODUgMTU2LjIzOCA0MDYuMzg3IDE1Ni45NjggNDA5LjUyIDE1OC4zNzRDNDEyLjY1MyAxNTkuNzc5IDQxNS40NDYgMTYxLjgyOCA0MTcuNzExIDE2NC4zODJDNDE5Ljk3NiAxNjYuOTM3IDQyMS42NjIgMTY5LjkzOSA0MjIuNjU1IDE3My4xODdDNDIzLjY0OCAxNzYuNDM1IDQyMy45MjYgMTc5Ljg1NSA0MjMuNDcgMTgzLjIxOEM0MjIuNTg0IDE4OS4wNTEgNDE5LjU4MSAxOTQuMzcgNDE1LjAxOCAxOTguMTg3QzQxMC40NTUgMjAyLjAwNCA0MDQuNjQzIDIwNC4wNjEgMzk4LjY1OCAyMDMuOTc2SDMyOC4yMjNDMzI3Ljg2OSAyMDMuOTg0IDMyNy41MjQgMjA0LjA4NiAzMjcuMjI0IDIwNC4yNzFDMzI2LjkyNCAyMDQuNDU1IDMyNi42NzkgMjA0LjcxNiAzMjYuNTE1IDIwNS4wMjVDMzI2LjM1MiAyMDUuMzM1IDMyNi4yNzYgMjA1LjY4MiAzMjYuMjk0IDIwNi4wM0MzMjYuMzEzIDIwNi4zNzkgMzI2LjQyNyAyMDYuNzE2IDMyNi42MjMgMjA3LjAwNloiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbF80MDJfMTQ1KSIvPgo8ZGVmcz4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzQwMl8xNDUiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTEuNjQyOCAxNTYuMDg3KSByb3RhdGUoMzEuODUyNikgc2NhbGUoMzkzLjE4NyAzMjAuOTA5KSI+CjxzdG9wIHN0b3AtY29sb3I9IiM3NTAwRUIiLz4KPHN0b3Agb2Zmc2V0PSIwLjQ4NjQyIiBzdG9wLWNvbG9yPSIjRTQyNTc1Ii8+CjxzdG9wIG9mZnNldD0iMC43OTE2NjciIHN0b3AtY29sb3I9IiNFNDI1NzUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY2OTE0Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg=="
                                                    alt="Magic Eden   icon"
                                                    class="wallet-modal-body-img-pop-2"
                                                />
                                                <div class=""><span class="wallet-modal-body-text-pop-2">Magic Eden </span></div>
                                            </div>
                                        </button>
                                        <div class="wallet-modal-body-recomend-cont-pop-2">
                                            <span>Recommended</span>
                                        </div>
                                    </div>

                                    <div class="wallet-modal-body-cont-pop-2">
                                        <button class="wallet-modal-body-botton-pop-2" data-id="xverseConnect">
                                            <div class="wallet-modal-body-content-pop-2">
                                                <img height="28" width="28" src="https://ord.cdn.magiceden.dev/static_resources/wallet_logos/xverse.png" alt="Xverse icon" class="wallet-modal-body-img-pop-2" />
                                                <div class="tw-flex tw-flex-col tw-justify-between"><span class="wallet-modal-body-text-pop-2">Xverse</span></div>
                                            </div>
                                        </button>
                                    </div>

                                    <div class="wallet-modal-body-cont-pop-2">
                                        <button class="wallet-modal-body-botton-pop-2" data-id="unisatConnect">
                                            <div class="wallet-modal-body-content-pop-2">
                                                <img height="28" width="28" src="https://ord.cdn.magiceden.dev/static_resources/wallet_logos/unisat.png" alt="Unisat icon" class="wallet-modal-body-img-pop-2" />
                                                <div class="tw-flex tw-flex-col tw-justify-between"><span class="wallet-modal-body-text-pop-2">Unisat</span></div>
                                            </div>
                                        </button>
                                    </div>


                                    <div class="wallet-modal-body-cont-pop-2">
                                        <button class="wallet-modal-body-botton-pop-2" data-id="leatherConnect">
                                            <div class="wallet-modal-body-content-pop-2">
                                                <img height="28" width="28" src="https://ord.cdn.magiceden.dev/static_resources/wallet_logos/leather.png" alt="Leather icon" class="wallet-modal-body-img-pop-2" />
                                                <div class="tw-flex tw-flex-col tw-justify-between"><span class="wallet-modal-body-text-pop-2">Leather</span></div>
                                            </div>
                                        </button>
                                    </div>


                                </div>
                                <hr class="wallet-modal-body-hr-pop-2" />
                                <div></div>
                            </div>
                        </div>

                        <div class="wallet-modal-futter-cont-pop-2">
                            <div class="tw-px-4 tw-mb-3 tw-text-center">
                                By connecting, you agree to Magic Eden's <a href="https://www.magiceden.io/legal/terms" target="_blank" rel="noreferrer noopener" class="tw-underline">Terms of Service</a> and
                                <a href="https://www.magiceden.io/legal/privacy-policy" target="_blank" rel="noreferrer noopener" class="tw-underline">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `

        document.body.appendChild(div)
        ///////////
        const buttonsHiro = document.querySelectorAll('[data-id="connect_button_modal"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "opacity: 0;  transition: all 0.2s ease-in-out;"

                setTimeout(() => {
                    document.getElementById("modal_popup").style = "opacity: 1;  transition: all 0.2s ease-in-out;"
                }, 200)
            })
        }
    
        document.getElementById("clsoe-pop").addEventListener("click", () => {
            document.getElementById("modal_popup").style = "display: none"
        })

        const popCont = document.getElementById("popCont")

        let status = false
       
        popCont.onmouseover = () => {
            status = true
        }
        popCont.onmouseleave = () => {
         
            status = false
        }

        document.getElementById("modal_popup").addEventListener("click", () => {
            if(status === false) {
                document.getElementById("modal_popup").style = "display: none"
            }
            
        })
    
    }, [null])

    return null
}








export const PopUp3 = () => {
    useEffect(() => {
        const div = document.createElement("div");

        div.innerHTML = `
        	<div  role="presentation" class="MuiModal-root css-8ndowl" id="modal_popup" style="display: none">
                <div aria-hidden="true" class="MuiBackdrop-root Modal_backdrop__yVk2e MuiModal-backdrop css-919eu4 ord-connect-wallet-modal" style="opacity: 1; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"></div>


                <div class="Modal_root__F4wBR">
                    <div  id="popCont" class="panel">
                        <section class="panel-title-container">
                            <h3 class="panel-title" id="headlessui-dialog-title-:rk:" data-headlessui-state="open">Choose Bitcoin wallet to connect</h3>
                            <div type="button" class="close-button" id="clsoe-pop">
                                <img
                                    src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12%2022C17.5228%2022%2022%2017.5228%2022%2012C22%206.47715%2017.5228%202%2012%202C6.47715%202%202%206.47715%202%2012C2%2017.5228%206.47715%2022%2012%2022Z'%20stroke='%23F2F2F2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%209L9%2015'%20stroke='%23F2F2F2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M9%209L15%2015'%20stroke='%23F2F2F2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                    alt="close modal"
                                />
                            </div>
                        </section>

                        <section class="panel-content-inner-container">
                            <button type="button" class="wallet-option-button"  data-id="unisatConnect">
                                <div class="option-wrapper">
                                    <div class="icon-we">
                                        <img
                                            class="wallet-icon"
                                            src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.8742%204.5804L18.5392%208.15088C18.8511%208.45416%2019.0047%208.76103%2018.9999%209.07026C18.995%209.3795%2018.8608%209.66136%2018.5984%209.91707C18.3239%2010.1847%2018.0277%2010.3203%2017.7109%2010.3262C17.3941%2010.331%2017.0797%2010.1811%2016.7677%209.87785L13.0193%206.22648C12.5937%205.8114%2012.1825%205.51762%2011.7872%205.34516C11.3917%205.1727%2010.9758%205.14535%2010.5405%205.26428C10.104%205.38203%209.63603%205.68532%209.13422%206.17295C8.44258%206.84733%208.11246%207.48007%208.14634%208.0712C8.18018%208.6623%208.52358%209.27602%209.17534%209.90996L12.954%2013.5922C13.2696%2013.8991%2013.4244%2014.2059%2013.4195%2014.5104C13.4147%2014.8161%2013.2793%2015.098%2013.012%2015.3584C12.746%2015.6177%2012.4522%2015.7533%2012.133%2015.764C11.8137%2015.7747%2011.4957%2015.6261%2011.1813%2015.3192L7.51634%2011.7487C6.92022%2011.1683%206.48975%2010.6188%206.22495%2010.1002C5.96014%209.58168%205.86099%208.99533%205.92991%208.34118C5.99158%207.78099%206.17416%207.23864%206.47887%206.71294C6.78237%206.18723%207.21768%205.64964%207.78237%205.09896C8.45466%204.44362%209.09673%203.94171%209.70858%203.59203C10.3192%203.24236%2010.9105%203.04849%2011.4812%203.00806C12.0532%202.96762%2012.6166%203.07942%2013.1741%203.34346C13.7315%203.6075%2014.2974%204.01902%2014.873%204.5804H14.8742Z'%20fill='url(%23paint0_linear_4212_6487)'/%3e%3cpath%20d='M9.12459%2018.9872L5.46081%2015.4167C5.14884%2015.1122%204.99527%2014.8066%205.00011%2014.4973C5.00495%2014.1881%205.13917%2013.9062%205.40156%2013.6505C5.67604%2013.3829%205.97229%2013.2473%206.28909%2013.2414C6.60589%2013.2366%206.92028%2013.3853%207.23225%2013.6897L10.9795%2017.3411C11.4063%2017.7562%2011.8162%2018.05%2012.2116%2018.2224C12.607%2018.3949%2013.023%2018.421%2013.4595%2018.3033C13.896%2018.1856%2014.3639%2017.8823%2014.8657%2017.3934C15.5574%2016.7191%2015.8875%2016.0863%2015.8537%2015.4952C15.8198%2014.9041%2015.4764%2014.2904%2014.8247%2013.6553L12.8114%2011.7106C12.4958%2011.4038%2012.341%2011.0969%2012.3458%2010.7925C12.3507%2010.4868%2012.4861%2010.2049%2012.7533%209.94445C13.0194%209.68514%2013.3132%209.54957%2013.6324%209.53887C13.9516%209.52816%2014.2696%209.67682%2014.584%209.9837L16.4824%2011.8165C17.0785%2012.3969%2017.509%2012.9464%2017.7738%2013.465C18.0386%2013.9835%2018.1378%2014.5699%2018.0688%2015.224C18.0072%2015.7842%2017.8246%2016.3266%2017.5199%2016.8523C17.2164%2017.378%2016.7811%2017.9156%2016.2164%2018.4663C15.5441%2019.1216%2014.902%2019.6235%2014.2902%2019.9732C13.6783%2020.3229%2013.0871%2020.5179%2012.5151%2020.5583C11.9432%2020.5988%2011.3797%2020.487%2010.8223%2020.2229C10.2648%2019.9589%209.69894%2019.5474%209.12338%2018.986L9.12459%2018.9872Z'%20fill='url(%23paint1_linear_4212_6487)'/%3e%3cpath%20d='M11.4098%209.77448C12.153%209.77448%2012.7556%209.18182%2012.7556%208.4507C12.7556%207.71962%2012.153%207.12695%2011.4098%207.12695C10.6665%207.12695%2010.064%207.71962%2010.064%208.4507C10.064%209.18182%2010.6665%209.77448%2011.4098%209.77448Z'%20fill='url(%23paint2_radial_4212_6487)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_4212_6487'%20x1='17.9364'%20y1='6.66057'%20x2='6.64095'%20y2='11.7639'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23201C1B'/%3e%3cstop%20offset='0.36'%20stop-color='%2377390D'/%3e%3cstop%20offset='0.67'%20stop-color='%23EA8101'/%3e%3cstop%20offset='1'%20stop-color='%23F4B852'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_4212_6487'%20x1='6.3763'%20y1='17.0541'%20x2='19.5023'%20y2='13.0825'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%231F1D1C'/%3e%3cstop%20offset='0.37'%20stop-color='%2377390D'/%3e%3cstop%20offset='0.67'%20stop-color='%23EA8101'/%3e%3cstop%20offset='1'%20stop-color='%23F4FB52'/%3e%3c/linearGradient%3e%3cradialGradient%20id='paint2_radial_4212_6487'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(11.4098%208.45191)%20scale(1.34581%201.32377)'%3e%3cstop%20stop-color='%23F4B852'/%3e%3cstop%20offset='0.33'%20stop-color='%23EA8101'/%3e%3cstop%20offset='0.64'%20stop-color='%2377390D'/%3e%3cstop%20offset='1'%20stop-color='%23211C1D'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e"
                                            alt=""
                                        />
                                        <span class="wallet-option-label">UniSat</span>
                                    
                                    </div>
                                    
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%2018L15%2012L9%206'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                        alt="Chevron Right"
                                        width="24"
                                        height="24"
                                        class="chveron-btn"
                                    />

                                </div>
                            </button>
                            <hr class="horizontal-separator" />
                            <button type="button" class="wallet-option-button" data-id="xverseConnect">
                                <div class="option-wrapper">
                                    <div class="icon-we">
                                    <img
                                        class="wallet-icon"
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.4283%2019.185V16.4677C19.4283%2016.36%2019.3855%2016.2572%2019.3092%2016.1809L7.74741%204.61916C7.67106%204.54281%207.56829%204.5%207.46055%204.5H4.74332C4.60917%204.5%204.5%204.60917%204.5%204.74332V7.26787C4.5%207.37562%204.54281%207.47837%204.61916%207.55472L8.76923%2011.7047C8.86412%2011.7997%208.86412%2011.9538%208.76923%2012.0487L4.57136%2016.2465C4.52569%2016.2922%204.5%2016.3543%204.5%2016.4185V19.185C4.5%2019.319%204.60917%2019.4283%204.74332%2019.4283H9.28369C9.41784%2019.4283%209.527%2019.319%209.527%2019.185V17.5552C9.527%2017.491%209.55271%2017.4289%209.59838%2017.3832L11.8504%2015.1312C11.9453%2015.0363%2012.0994%2015.0363%2012.1943%2015.1312L16.3729%2019.3099C16.4492%2019.3862%2016.552%2019.429%2016.6597%2019.429H19.1843C19.3185%2019.429%2019.4276%2019.3198%2019.4276%2019.1857L19.4283%2019.185Z'%20fill='white'/%3e%3cpath%20d='M13.372%208.09816H15.6461C15.781%208.09816%2015.8909%208.20805%2015.8909%208.34292V10.617C15.8909%2010.8353%2016.1549%2010.9445%2016.309%2010.7897L19.4287%207.66505C19.4743%207.61937%2019.5001%207.5573%2019.5001%207.49236V4.75588C19.5001%204.62102%2019.3908%204.51114%2019.2553%204.51114L16.4781%204.50757C16.4132%204.50757%2016.3511%204.53326%2016.3047%204.57892L13.1986%207.68003C13.0445%207.83415%2013.1537%208.09816%2013.3713%208.09816H13.372Z'%20fill='%23EE7A30'/%3e%3c/svg%3e"
                                        alt=""
                                    />

                                        <span class="wallet-option-label">Xverse</span>
                                    
                                    </div>
                                    
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%2018L15%2012L9%206'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                        alt="Chevron Right"
                                        width="24"
                                        height="24"
                                        class="chveron-btn"
                                    />

                                </div>
                            </button>
                            <hr class="horizontal-separator" />
                            <button type="button" class="wallet-option-button" data-id="magicConnect">
                                <div class="option-wrapper">
                                    <div class="icon-we">
                                    <img
                                        class="wallet-icon"
                                        src="data:image/svg+xml,%3csvg%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20x='0.423462'%20width='24'%20height='24'%20rx='12'%20fill='%231C1326'/%3e%3cpath%20d='M15.6787%209.69931L16.5929%2010.7735C16.6976%2010.8942%2016.7904%2010.9934%2016.8279%2011.0499C17.1013%2011.3216%2017.2546%2011.6889%2017.2544%2012.0716C17.2288%2012.523%2016.9345%2012.8305%2016.662%2013.1594L16.0222%2013.9106L15.6885%2014.2998C15.6765%2014.3132%2015.6688%2014.3298%2015.6663%2014.3475C15.6638%2014.3652%2015.6666%2014.3832%2015.6743%2014.3993C15.6821%2014.4155%2015.6945%2014.429%2015.71%2014.4383C15.7255%2014.4476%2015.7434%2014.4522%2015.7616%2014.4515H19.0968C19.6062%2014.4515%2020.248%2014.8797%2020.2105%2015.5297C20.2095%2015.8251%2020.0899%2016.1081%2019.8779%2016.317C19.6659%2016.5259%2019.3788%2016.6437%2019.079%2016.6447H13.856C13.5124%2016.6447%2012.5883%2016.6817%2012.3296%2015.8936C12.2746%2015.7289%2012.2671%2015.5524%2012.3079%2015.3837C12.3831%2015.1343%2012.502%2014.8998%2012.6594%2014.6909C12.922%2014.3017%2013.2064%2013.9125%2013.4868%2013.535C13.8481%2013.0407%2014.2194%2012.5619%2014.5847%2012.0579C14.5977%2012.0415%2014.6047%2012.0213%2014.6047%2012.0005C14.6047%2011.9797%2014.5977%2011.9595%2014.5847%2011.9431L13.2577%2010.3863C13.2491%2010.375%2013.2379%2010.3658%2013.225%2010.3595C13.2122%2010.3532%2013.198%2010.3499%2013.1836%2010.3499C13.1693%2010.3499%2013.1551%2010.3532%2013.1423%2010.3595C13.1295%2010.3658%2013.1182%2010.375%2013.1096%2010.3863C12.7542%2010.8591%2011.1982%2012.9531%2010.8664%2013.3773C10.5346%2013.8016%209.71714%2013.8249%209.26493%2013.3773L7.18959%2011.3243C7.17633%2011.3112%207.1594%2011.3022%207.14103%2011.2986C7.12261%2011.295%207.10348%2011.2968%207.08614%2011.3039C7.06879%2011.311%207.05398%2011.323%207.04358%2011.3384C7.03317%2011.3538%207.02764%2011.3719%207.02768%2011.3904V15.3389C7.03256%2015.6192%206.94837%2015.8938%206.78689%2016.1245C6.6254%2016.3552%206.39473%2016.5303%206.12722%2016.6253C5.95626%2016.6839%205.77359%2016.7014%205.59439%2016.6763C5.41518%2016.6513%205.24465%2016.5843%205.09704%2016.4811C4.94943%2016.3779%204.82898%2016.2414%204.74575%2016.083C4.66252%2015.9246%204.61892%2015.7489%204.61859%2015.5705V8.47138C4.63049%208.21553%204.7239%207.96991%204.88554%207.76938C5.04719%207.56885%205.26884%207.42363%205.51901%207.35435C5.73365%207.298%205.95954%207.29856%206.17386%207.35599C6.38817%207.41341%206.58326%207.52563%206.73936%207.6813L9.93042%2010.83C9.93998%2010.8395%209.95151%2010.8469%209.96431%2010.8516C9.97706%2010.8562%209.9907%2010.8581%2010.0043%2010.857C10.0178%2010.8559%2010.031%2010.8518%2010.0428%2010.8451C10.0546%2010.8385%2010.0648%2010.8293%2010.0726%2010.8183L12.3395%207.72606C12.4442%207.60053%2012.5756%207.49905%2012.7243%207.42883C12.873%207.35856%2013.0355%207.32121%2013.2005%207.31933H19.0968C19.2581%207.31956%2019.4176%207.35378%2019.5644%207.41969C19.7113%207.48555%2019.8422%207.5816%2019.9484%207.70131C20.0546%207.82108%2020.1336%207.9618%2020.1802%208.11405C20.2267%208.2663%2020.2397%208.42661%2020.2184%208.58425C20.1768%208.85767%2020.0361%209.107%2019.8222%209.28592C19.6083%209.46485%2019.3358%209.56127%2019.0553%209.55728H15.7537C15.7371%209.55766%2015.7209%209.56244%2015.7068%209.57111C15.6928%209.57974%2015.6813%209.59197%2015.6736%209.60645C15.666%209.62099%2015.6624%209.63725%2015.6632%209.65356C15.6641%209.66992%2015.6695%209.68572%2015.6787%209.69931Z'%20fill='url(%23paint0_radial_6204_5907)'/%3e%3cdefs%3e%3cradialGradient%20id='paint0_radial_6204_5907'%20cx='0'%20cy='0'%20r='1'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(4.66396%207.31249)%20rotate(31.8526)%20scale(18.4306%2015.0426)'%3e%3cstop%20stop-color='%237500EB'/%3e%3cstop%20offset='0.48642'%20stop-color='%23E42575'/%3e%3cstop%20offset='0.791667'%20stop-color='%23E42575'/%3e%3cstop%20offset='1'%20stop-color='%23FF6914'/%3e%3c/radialGradient%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />

                                        <span class="wallet-option-label">Magic Eden</span>
                                    
                                    </div>
                                    
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%2018L15%2012L9%206'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                        alt="Chevron Right"
                                        width="24"
                                        height="24"
                                        class="chveron-btn"
                                    />

                                </div>
                            </button>
                            <hr class="horizontal-separator" />
                            <button type="button" class="wallet-option-button" data-id="leatherConnect">
                                <div class="option-wrapper">
                                    <div class="icon-we">
                                    <img
                                        class="wallet-icon"
                                        src="data:image/svg+xml,%3csvg%20width='41'%20height='40'%20viewBox='0%200%2041%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect%20x='0.5'%20width='40'%20height='40'%20rx='20'%20fill='url(%23pattern0)'/%3e%3cdefs%3e%3cpattern%20id='pattern0'%20patternContentUnits='objectBoundingBox'%20width='1'%20height='1'%3e%3cuse%20xlink:href='%23image0_21497_326778'%20transform='translate(-0.00625)%20scale(0.0125)'/%3e%3c/pattern%3e%3cimage%20id='image0_21497_326778'%20width='81'%20height='80'%20xlink:href='data:image/png;base64,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'/%3e%3c/defs%3e%3c/svg%3e"
                                        alt=""
                                    />

                                        <span class="wallet-option-label">Leather</span>
                                    
                                    </div>
                                    
                                    <img
                                        src="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%2018L15%2012L9%206'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
                                        alt="Chevron Right"
                                        width="24"
                                        height="24"
                                        class="chveron-btn"
                                    />

                                </div>
                            </button>
                        </section>


                    </div>
                </div>
            </div>
        `

        document.body.appendChild(div)
        ///////////

        const buttonsHiro = document.querySelectorAll('[data-id="connect_button_modal"]')

        for(let button of buttonsHiro) {
            button.addEventListener("click", () => {
                document.getElementById("modal_popup").style = "opacity: 0;  transition: all 0.2s ease-in-out;"

                setTimeout(() => {
                    document.getElementById("modal_popup").style = "opacity: 1;  transition: all 0.2s ease-in-out;"
                }, 200)
            })
        }


        const popCont = document.getElementById("popCont")

        let status = false
       
        popCont.onmouseover = () => {
            status = true
        }
        popCont.onmouseleave = () => {
         
            status = false
        }

        document.getElementById("modal_popup").addEventListener("click", () => {
            if(status === false) {
                document.getElementById("modal_popup").style = "display: none"
            }
            
        })
    
        document.getElementById("clsoe-pop").addEventListener("click", () => {
            document.getElementById("modal_popup").style = "display: none"
        })
    
    }, [null])

    return null
}