using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using System.IO;
using System.Text.RegularExpressions;
using System;
namespace APIPetFeliz.Azure
{
    public class AzureBlobStorage
    {
        public string UploadImage(string image)
        {
            string connectionString = "DefaultEndpointsProtocol=https;AccountName=petfeliz;AccountKey=GfsODMP1hdcWW0ix7QQrQYRKlRPqYvom6aK2ZZ5TzqZjp1mrSa2Yjyme1OBTuMP6oZIH9ipO6TzK+ASt/aDXeQ==;EndpointSuffix=core.windows.net";
            string containerName = "images";

            // Gera um nome randomico para imagem
            var fileName = Guid.NewGuid().ToString() + ".jpg";

            // Limpa o hash enviado
            var data = new Regex(@"^data:image\/[a-z]+;base64,").Replace(image, "");

            // Gera um array de Bytes
            byte[] imageBytes = Convert.FromBase64String(data);

            // Define o BLOB no qual a imagem será armazenada
            var blobClient = new BlobClient(connectionString, containerName, fileName);

            var blobHttpHeader = new BlobHttpHeaders { ContentType = "image/jpg" };

            // Envia a imagem
            using (var stream = new MemoryStream(imageBytes))
            {
                blobClient.Upload(stream, new BlobUploadOptions()
                {
                    HttpHeaders = blobHttpHeader,
                });
            }

            // Retorna a URL da imagem
            return blobClient.Uri.AbsoluteUri;
        }
    }
}
