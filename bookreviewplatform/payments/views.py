
import stripe
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from books.models import Book
import os 


stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_checkout_session(request):
    try:
        book_id = request.data['book_id']
        book = Book.objects.get(id=book_id)
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': book.title,
                    },
                    'unit_amount': book.price,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:5173/success',
            cancel_url='http://localhost:5173/cancel',
        )
        return JsonResponse({'id': session.id})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
