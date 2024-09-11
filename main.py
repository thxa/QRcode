import qrcode
from PIL import Image
import sys 







def main(argv):


    if len(argv) < 4: 
        print(f"{argv[0]} [url] [input_image.png] [output QR path]")
        return 

    # taking image which user wants 
    # in the QR code center
    # Logo_link = 'g4g.jpg'
    # Logo_link = 'github.png'
    # Logo_link = 'linkedin0.png'
    # Logo_link = 'github0.png'
    Logo_link = argv[2]
     
    logo = Image.open(Logo_link)
     
    # taking base width
    basewidth = 100
     
    # adjust image size
    wpercent = (basewidth/float(logo.size[0]))
    hsize = int((float(logo.size[1])*float(wpercent)))
    logo = logo.resize((basewidth, hsize), Image.Resampling.LANCZOS)
    QRcode = qrcode.QRCode(
        error_correction=qrcode.constants.ERROR_CORRECT_H
    )
     
    # taking url or text
    # url = 'https://www.github.com/'
    url = argv[1]
     
    # adding URL or text to QRcode
    QRcode.add_data(url)
     
    # generating QR code
    QRcode.make()
     
    # taking color name from user
    # QRcolor = 'Green'
    # QRcolor = 'Black'
    QRcolor = 'Gray'
     
    # adding color to QR code
    QRimg = QRcode.make_image(
        fill_color=QRcolor, back_color="white").convert('RGB')
     
    # set size of QR code
    pos = ((QRimg.size[0] - logo.size[0]) // 2,
           (QRimg.size[1] - logo.size[1]) // 2)
    QRimg.paste(logo, pos)
     
    # save the QR code generated
    # QRimg.save('github_QR.png')
    QRimg.save(f'{argv[3]}_QR.png')
     
    print('QR code generated!')



if __name__ == '__main__':
    main(sys.argv)
