function generateQRCode() {
            const url = document.getElementById('url').value;
            const logoInput = document.getElementById('logo').files[0];
            const color = document.getElementById('color').value;
                
            const basewidth = document.getElementById('basewidth').value;


            const reader = new FileReader();
            reader.onload = function(event) {
                const logo = new Image();
                logo.onload = function() {
                    const wpercent = basewidth / logo.width;
                    const hsize = Math.round(logo.height * wpercent);
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = basewidth;
                    canvas.height = hsize;
                    ctx.drawImage(logo, 0, 0, basewidth, hsize);

                    const qr = qrcode(0, 'H');
                    qr.addData(url);
                    qr.make();
                    
                    const qrCanvas = document.getElementById('qrCanvas');
                    qrCanvas.width = qr.getModuleCount() * 10;
                    qrCanvas.height = qr.getModuleCount() * 10;
                    const qrCtx = qrCanvas.getContext('2d');

                    // Draw QR code
                    for (let row = 0; row < qr.getModuleCount(); row++) {
                        for (let col = 0; col < qr.getModuleCount(); col++) {
                            qrCtx.fillStyle = qr.isDark(row, col) ? color : '#ffffff';
                            qrCtx.fillRect(col * 10, row * 10, 10, 10);
                        }
                    }

                    // Draw logo in the center of the QR code
                    const posX = (qrCanvas.width - basewidth) / 2;
                    const posY = (qrCanvas.height - hsize) / 2;
                    qrCtx.drawImage(canvas, posX, posY, basewidth, hsize);

                    // Convert canvas to image and display it
                    const qrImage = document.getElementById('qrImage');
                    qrImage.src = qrCanvas.toDataURL('image/png');
                };
                logo.src = event.target.result;
            };
    reader.readAsDataURL(logoInput);
}

