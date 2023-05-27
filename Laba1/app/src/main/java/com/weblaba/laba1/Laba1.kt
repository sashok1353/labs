package com.weblaba.laba1

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.URLEncoder
import java.util.*

suspend fun simplifyExpression(expression: String): ResponseModel? {
    val encodedExpression = withContext(Dispatchers.IO) {
        URLEncoder.encode(expression, "UTF-8")
    }
    val apiUrl = "https://newton.vercel.app/api/v2/simplify/$encodedExpression"

    val client = HttpClient(CIO) {
        install(JsonFeature) {
            serializer = GsonSerializer()
        }
    }

    val response: HttpResponse = client.get(apiUrl)
    return if (response.status.isSuccess()) {
        response.receive<ResponseModel>()
    } else {
        null
    }
}

suspend fun main() {
    while (true) {
        val scanner = Scanner(System.`in`)
        print("Введіть алгебраїчний вираз: ")
        val expression = scanner.nextLine()

        CoroutineScope(Dispatchers.IO).launch {
            val simplifyResult = simplifyExpression(expression)
            if (simplifyResult != null) {
                println("Спрощений вираз: ${simplifyResult.result}")
            } else {
                println("Не вдалося отримати спрощений вираз")
            }
        }.join()
    }
}